from functools import wraps
from threading import Timer
from flask import redirect, session

import csv
import sys
import fileinput
import os


# Declare the necessary (global) variables
station_data = []
air_pressure_list = []


# Get the station_data list.
def setStation_data(stations):
    global station_data
    station_data = stations


# Ensure that only users who have logged in, can access certain web pages/ data.
def login_required(f):
    """
    Decorate routes to require login.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        # Check whether the user has actually logged in or not.
        if session.get("logged_in") is None:
            return redirect("/login")
        return f(*args, **kwargs)
    return decorated_function


# Map station numbers to countries/ regions/ longitude/ latitude.
def mapStationNumbers(csv_stations, initialization_values):
    """
    Converts a csv file to a python data structure,
    in order to use the acumulated data.

    csv_stations, a csv file containing all the necessary information needed to map a station to a country/ region.
    format should look like this: STATION_NUMBER,COUNTRY,REGION,LONGITUDE,LATITUDE

    intialization_values, a file to fill the html table on the first run. These are to be overridden by the
    new values comming from the web server. The stations_directory's content is added to a new variable in
    application.py which is to be overridden on the first iteration.
    """
    stations_dictionary = {}
    locations = []
    with open(csv_stations, "r") as csv_EEU:
        reader = csv.reader(csv_EEU)
        for row in reader:
            station_nr = int(row[0])
            country = row[1].title()
            region = row[2].title()[0:]
            longitude = float(row[3])
            latitude = float(row[4])
            stations_dictionary[station_nr] = [country, region]
            locations.append({"latitude": latitude, "longitude": longitude, "title": region})

    with open(initialization_values, "r") as file:
        for line in file:
            line_data = line.split("_")
            if '\n' not in line_data:
                stations_dictionary.get(int(line_data[0])).append(float(line_data[1]))

    # Append the locations where the weather stations in Moldova are located at.
    locations.append({"latitude": 47.783, "longitude": 27.95, "title": "Bel `Cy"})
    locations.append({"latitude": 47.017, "longitude": 28.983, "title": "Kisinev"})
    locations.append({"latitude": 46.3, "longitude": 28.633, "title": "Komrat"})
    return stations_dictionary, locations
