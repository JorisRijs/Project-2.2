package ServerApplication;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.HashMap;
import java.util.Scanner;

/**
 * This class is used to get the station numbers and country names belonging to a certain region specified by clients.
 * This class can be modified to add new regions for new clients.
 */
public class Comparator {
    private static HashMap<Integer, String> stationsEEU = new HashMap<Integer, String>();
    private static HashMap<Integer, String> stationsMOLDOVA = new HashMap<Integer, String>();
    private static String stationsDir = "/home/localadmin/2.2-Weather-Station/Web Application/";

    /**
     * Constructor of the Comparator class, fills stationsMOLDOVA and stationsEEU hashmaps
     * @throws FileNotFoundException
     */
    public Comparator() throws FileNotFoundException{
        stnConverterEEU();
        stationsMOLDOVA.put(337450, "Moldova");
        stationsMOLDOVA.put(338150, "Moldova");
        stationsMOLDOVA.put(338830, "Moldova");
    }

    /**
     * Method that converts all Eastern Europe stations listed in a .csv file to a hashmap containing the station number
     * and a string indicating which country it is in.
     * @return HashMap<Integer, String> stationsEEU.
     * @throws FileNotFoundException
     */
    private HashMap<Integer, String> stnConverterEEU() throws FileNotFoundException {
        //creates a new scanner to read file
        Scanner scn;
        //Gets csv file for the stations in Eastern Europe
        scn = new Scanner(new File(stationsDir + "stations.csv"));
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

    /**
     * Getter for hashmap containing all stations in Eastern Europe.
     * @return HashMap<Integer, String> stationsEEU.
     */
    public HashMap<Integer, String> getStationsEEU(){
        return stationsEEU;
    }

    /**
     * Getter for hashmap containing all stations in Moldova.
     * @return HashMap<Integer, String> stationsEEU.
     */
    public HashMap<Integer, String> getStationsMOLDOVA(){
        return stationsMOLDOVA;
    }
}