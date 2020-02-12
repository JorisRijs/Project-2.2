import os
import re
import datetime
import json
from tempfile import mkdtemp
from threading import Timer
from flask import Flask, redirect, render_template, request, session, flash, send_file, jsonify
from flask_session import Session
from lxml import etree as XML
from functions import login_required
from functions import mapStationNumbers
from functions import setStation_data


# Configure application
app = Flask(__name__)
app.secret_key = 'super serial'


# Reload templates when they are changed
app.config["TEMPLATES_AUTO_RELOAD"] = True


# Configure session to use filesystem (instead of signed cookies)
app.config["SESSION_FILE_DIR"] = mkdtemp()
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


# path = "/etc/DataStore/Website/"
path = "files/"


# Initialize the necessary variables
station_data, locations = mapStationNumbers("static/stations_test.csv", "static/initialization.txt")
setStation_data(station_data)
moldova_dict = {}
global_var = 0


# Forward the user to the home page, only if the user has logged in.
@app.route("/")
@login_required
def index():
    return render_template("home.html", geolocations=locations)


# Allow the user to login with the right credentials
@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST" and request.form['password'] == 'password' and request.form['email'] == 'admin@admin':
        session['logged_in'] = True
        # Read files in the web application directory
        checkDirectoryAtCertainInterval()
        return redirect("/")
    elif request.method == "POST":
        flash('Wrong username or password!')
    return render_template("login.html")


# Forward the user to the dashboard, only if the user has logged in.
@app.route("/dashboard", methods=["GET", "POST"])
@login_required
def dashboard():
    return render_template("dashboard.html", stations=station_data, date_EEU=datetime.datetime.now().strftime('%d-%m-%y'), date_moldova=datetime.datetime.now().strftime('%H:%M:%S'))


# Forward the user to an xml file page, only if the user has logged in.
@app.route("/weatherdata")
@login_required
def return_file():
    GenerateXML("weatherdata.xml")
    return send_file('weatherdata.xml', attachment_filename="weatherdata.xml")


# Logout function, allow the user to logout.
@app.route("/logout")
@login_required
def logout():
    session.pop('logged_in', None)
    return redirect("/")


# XML converter
def GenerateXML(fileName):
    data = []
    root = XML.Element("root")

    for key, values in station_data.items():
        weatherdata = XML.SubElement(root, "Weatherdata")
        Id = XML.SubElement(weatherdata, "StationId")
        Id.text = str(key)

        country = XML.SubElement(weatherdata, "Country")
        country.text = str(values[0])

        region = XML.SubElement(weatherdata, "Region")
        region.text = str(values[1])

        airpsi = XML.SubElement(weatherdata, "Air_Pressure")
        airpsi.text = str(values[2])

        time = XML.SubElement(weatherdata, "Time_Updated")
        time.text = str(datetime.datetime.now().strftime('%d-%m-%y'))

    tree = XML.ElementTree(root)

    with open(fileName, "wb") as files:
        tree.write(files, encoding='utf8', pretty_print=True)


# This function checks whether the specified directory contains any files that contain parsed data.
def checkDirectoryAtCertainInterval():
    # Make all global variables listed below usable in the scope of this function
    global global_var
    global moldova_dict
    global station_data
    global air_pressure_list

    # List all files in the current directory, specified by the path variable
    filelist = os.listdir(path)
    if len(filelist) > 0:
        print("here")
        moldova_data = {}
        for file in filelist:
            print("file: ", file)
            filepath = os.path.join(path + file)
            size = os.path.getsize(filepath)
            with open(filepath) as f:
                if size > 0:
                    moldova_list = []
                    if size > 1024:
                        air_pressure_list = []
                        for line in f:
                            values = line.split("_")
                            # Check whether the current station number of the current weather station is equal to any of the station numbers
                            # of any of the station located in Moldova.
                            if values[0] == '337450' or values[0] == '338150' or values[0] == '338830':
                                # Convert the values and store them in python variables
                                station = int(values[0])
                                temp = values[1]
                                dewp = values[2][:-1]
                                # Create a fixed datastructure that can be easily used to convert python variables into javascript variables.
                                moldova_data = {
                                    'station_nr': station,
                                    'temp': float(temp),
                                    'dewp': float(dewp)
                                }
                                moldova_list.append(moldova_data)
                            else:
                                if ' \n' not in values and '\n' not in values:
                                    air_pressure_list.append((values[0], values[1].replace('\n', '')))

                        moldova_dict['moldova' + str(global_var % 1)] = moldova_list

                        for values in air_pressure_list:
                            station_nr = int(values[0])
                            if(station_data.get(station_nr) is not None):
                                country = station_data.get(station_nr)[0]
                                region = station_data.get(station_nr)[1]
                                station_data.get(station_nr).clear()
                                station_data.get(station_nr).append(country)
                                station_data.get(station_nr).append(region)
                                station_data.get(station_nr).append(float(values[1]))
                                station_data.get(station_nr).append(datetime.datetime.now().strftime('%d-%m-%y'))
                    else:
                        for line in f:
                            values = line.split("_")
                            if ' \n' not in values and '\n' not in values:
                                station = int(values[0])
                                data = {
                                    'station_nr': station,
                                    'temp': float(values[1]),
                                    'dewp': float(values[2][:-2])
                                }
                                moldova_list.append(data)
                        moldova_dict['moldova' + str(global_var % 1)] = moldova_list
            global_var += 1
            os.remove(f.name)
            print(moldova_dict)
    if moldova_dict == {} and len(os.listdir(path)) == 0:
        moldova_dict['moldova' + str(0)] = [{'station_nr': 338150, 'temp': 0, 'dewp': 0},
                                            {'station_nr': 338830, 'temp': 0, 'dewp': 0}, {'station_nr': 337450, 'temp': 0, 'dewp': 0}]
    Timer(1.0, checkDirectoryAtCertainInterval).start()


# Create a route, this route can be accessed by the JQuery command used in dashboard.html
@app.route("/dashboard_data")
def returnData():
    global moldova_dict
    return jsonify(moldova_dict)