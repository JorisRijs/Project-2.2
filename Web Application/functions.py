from functools import wraps

from flask import redirect, session
import csv
import sys
import fileinput


def login_required(f):
    """
   Decorate routes to require login.
   """

    @wraps(f)
    def decorated_function(*args, **kwargs):
        if session.get("logged_in") is None:
            return redirect("/login")
        return f(*args, **kwargs)

    return decorated_function

def stnConverter():
    with open("stations.csv", "r") as stations:
        reader = csv.reader(stations)
        stations = []
        for row in reader:
            key = row[0]
            value = row[1]
            #print(key + " " + value)
            tup = (key, value)
            stations.append(tup)
        #print(stations)
        return stations

def nameAllocator(sequence, stations):
        for (j, item) in enumerate(sequence):
            temp_sequence = item
            temp_STN = temp_sequence[0]
            for i in stations:
                station = i[0]
                name = i[1]
                #print(temp_sequence[0])
                #print(station)
                if temp_STN == station:
                    #print("found station", name)
                    
                    item[0] = name
                else:
                    pass
        #print(sequence)
        return sequence

def sequenceCorrector(list):
    return_list = []
    #print list
    for (i,item) in enumerate(list):
        sequence = str(item)
        temp_list = sequence.split(",")
        print(temp_list)