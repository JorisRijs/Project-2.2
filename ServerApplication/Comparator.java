package ServerApplication;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Scanner;


public class Comparator {
    private static HashMap<Integer, String> stationsEEU = new HashMap<Integer, String>();
    private static HashMap<Integer, String> stationsMOLDOVA = new HashMap<Integer, String>();
    private static String location1 = "/home/localadmin/2.2-Weather-Station/Web Application/stations.csv";
    private static String location2 = "/home/localadmin/2.2-Weather-Station/Web Application/";

    public Comparator(){
        try {
            stnConverterEEU();
            stationsMOLDOVA.put(337450, "Moldova");
            stationsMOLDOVA.put(338150, "Moldova");
            stationsMOLDOVA.put(338830, "Moldova");
        }
        catch(FileNotFoundException fnfo){
            fnfo.printStackTrace();
        }
    }

    private HashMap<Integer, String> stnConverterEEU() throws FileNotFoundException {
        //creates a new scanner to read file
        Scanner scn;
        //Gets csv file for the stations in Eastern Europe
        scn = new Scanner(new File(location2 + "stations.csv"));
        while(scn.hasNext()){
            String temp = scn.next();
            String[] values = temp.split(",");
            String station = values[0];
            Integer stn = Integer.parseInt(station, 10);
            String country = values[1];
            stationsEEU.put(stn, country);
        }
        scn.close();
        return stationsEEU;
    }

    public HashMap<Integer, String> getStationsEEU(){
        return stationsEEU;
    }

    public HashMap<Integer, String> getStationsMOLDOVA(){
        return stationsMOLDOVA;
    }

    private static Double returnAVG(ArrayList<Double> sequence){
        Double temp = 0.0;
        if(sequence.isEmpty()){
            return null;
        }else{
            for(Double item : sequence){
                temp+=item;
            }
        }
        temp = temp/sequence.size();
        return temp;
    }

}
