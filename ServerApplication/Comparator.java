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
    private static HashMap<Integer, Double> stationsEEU = new HashMap<>();
    private static HashMap<Integer, String> stationsMOLDOVA = new HashMap<>();
    private static String location1 = "home/xps15-pop_os/Documents/Programming/2.2-Weather-Station/Web Application/stations.csv";
    private static String location2 = "c:/temp/documents/";

    /**
     * Constructor of the Comparator class, fills stationsMOLDOVA and stationsEEU hashmaps
     * @throws FileNotFoundException
     */
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

    /**
     * Method that converts all Eastern Europe stations listed in a .csv file to a hashmap containing the station number
     * and a string indicating which country it is in.
     * @return HashMap<Integer, String> stationsEEU.
     * @throws FileNotFoundException
     */
    private HashMap<Integer, Double> stnConverterEEU() throws FileNotFoundException {
        //creates a new scanner to read file
        Scanner scn;

        //Gets csv file for the stations in Eastern Europe
        scn = new Scanner(new File(location2 + "stations.csv"));
        scn.useDelimiter("\n");
        while(scn.hasNext()){
            String temp = scn.next();
            String[] values = temp.split(",");
            String station = values[0];
            Integer stn = Integer.parseInt(station, 10);
            stationsEEU.put(stn, 0.0);
        }
        scn.close();
        return stationsEEU;
    }

    /**
     * Getter for hashmap containing all stations in Eastern Europe.
     * @return HashMap<Integer, String> stationsEEU.
     */
    public HashMap<Integer, Double> getStationsEEU(){
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
