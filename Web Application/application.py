from tempfile import mkdtemp

from flask import Flask, redirect, render_template, request, session, flash, send_file
from flask_session import Session

from functions import login_required
from lxml import etree as XML
from functions import stnConverter
from functions import nameAllocator
from functions import sequenceCorrector
import os
import re

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

#list of data for the table
data = []
data2 = [1,2]
values_high = dict()
values_low = dict()
# with open("data.txt", 'r') as f:
#     stations = stnConverter()
#     #print(stations)
#     #print(f)
#     data = [line.replace('\n', '') for line in f]
#     #print(data)
#     data = [line.replace('\t', ',') for line in data]
#     #print data
#     data = [line.split(",") for line in data]
#     print(data)
#     data = nameAllocator(data, stations)

path = "/etc/DataStore/Website/"

stations = stnConverter()

#THIS 'WITH OPEN' IS FOR READING FROM A DIRECTORY#######################################################
#filelist = os.listdir(path)
#for file in filelist:
   # with open(os.path.join(path + file)) as f:

#THIS 'WITH OPEN' IS FOR TESTDATA!!!!! #############################################################
with open('2020-02-03_11_16_23.txt', 'r') as f:

        for line in f:
            #print(line)
            line.replace("\n", "")
            Values = line.split("_")
            Values.append(Values[2])
            Values[2] = Values[1]
            Values[1] = Values[0]
            #print(Values)
            for (j, item) in enumerate(Values):

                temp_sequence = item
                temp_STN = Values[1]
                print(data2)
                #print(Values[1])
                if temp_STN == '337450':
                    #print("Moldova1")
                    data2[0] = float(Values[2])
                    data2[1]=float(Values[3].replace("\n", ""))
                    break

                elif temp_STN == '338150':
                    #print("Moldova2")
                    data2[0] = float(Values[2])
                    data2[1] = float(Values[3].replace("\n", ""))
                    break

                elif temp_STN == '338830':
                    #print("Moldova3")
                    data2[0] = float(Values[2])
                    data2[1] = float(Values[3].replace("\n", ""))
                    
                    break

                for i in stations:
                    station = i[0]
                    name = i[1]
                    #print(temp_sequence[0])
                    #print(station)
                if temp_STN == station:
                    
                    #print("found station", name)
                    #print(item + name)
                    item = name
                else:
                    pass
            #print(sequence)
            #return sequence

            new_values = nameAllocator(Values,stations)
            data.append(Values)
data = nameAllocator(data, stations)

print(data2)

    



@app.route("/")
@login_required
def index():
    return render_template("home.html")


@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST" and request.form['password'] == 'password' and request.form['email'] == 'admin@admin':
        session['logged_in'] = True
        return redirect("/")
    elif request.method == "POST":
        flash('Wrong username or password!')

    return render_template("login.html")


py_tempC = int(round(-100,2))
py_tempDew = int(round(10, 2))
print(py_tempC)
print(py_tempDew)
@app.route("/dashboard")
@login_required
def dashboard():
    return render_template("dashboard.html", len = len(data), data=data)



# with open(dewpoint.txt, "r") as f:
#     data_dewpoint = [line.replace('\n', '') for line in f]
#     data_dewpoint = [line.replace('\t', '') for line in data_dewpoint]
#     data_dewpoint = [line.split(',') for line in data_dewpoint]


@app.route("/weatherdata")
@login_required
def return_file():

    GenerateXML("weatherdata.xml")

    return send_file('weatherdata.xml', attachment_filename="weatherdata.xml")

@app.route("/logout")
@login_required
def logout():
    session.pop('logged_in', None)
    return redirect("/")


#XML converter
def GenerateXML(fileName):
    data = []

    with open("data.txt", 'r') as f:
        data = [line.replace('\n', '') for line in f]
        data = [line.replace('\t', ',') for line in data]
        data = [line.split(",") for line in data]


    root=XML.Element("root")



    for line in data:
        weatherdata=XML.SubElement(root, "Weatherdata")
        #print(line[3])
        Id=XML.SubElement(weatherdata, "StationId")
        Id.text = str(line[1])

        country=XML.SubElement(weatherdata, "Country")
        country.text = str(line[0])

        airpsi=XML.SubElement(weatherdata, "Air_Pressure")
        airpsi.text = str(line[2])

        time=XML.SubElement(weatherdata, "Time_Updated")
        time.text = str(line[3])

    tree=XML.ElementTree(root)
    with open(fileName, "wb") as files:
        tree.write(files, encoding= 'utf8', pretty_print= True)

if __name__ == "__main__":
     GenerateXML("test.xml")
    


# if __name__ == '__main__':
#     # Reload templates when they are changed
#     app.config["TEMPLATES_AUTO_RELOAD"] = True

#     # Configure session to use filesystem (instead of signed cookies)
#     app.config["SESSION_FILE_DIR"] = mkdtemp()
#     app.config["SESSION_PERMANENT"] = False
#     app.config["SESSION_TYPE"] = "filesystem"
#     Session(app)

#     app.run()


