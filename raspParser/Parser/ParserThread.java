package raspParser.Parser;

import raspParser.Buffer.BufferManager;
import raspParser.ConsoleColors;
import raspParser.Extrapolation;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.Socket;

/**
 * This class reads through a sockets input stream, and parses it to retrieve necessary data.
 * The parsed data is then passed through to the BufferManager.
 */
public class ParserThread implements Runnable {

    private Socket socket;
    private BufferManager buffer;
    private Extrapolation extrapolation;
    private int threadID;
    private ParserManager parserThreadManager;
    private int pointer = 0;
    private double double_val;
    private int line_count = 1;
    private int[] array;
    private BufferedReader bin;

    /**
     * Constructor for ParserThread class.
     * @param socket the socket to retrieve data from.
     * @param buffer the BufferManager to pass parsed data to.
     * @param extrapolation the Extrapolation class.
     * @param threadID int with an ID used for debugging.
     * @param manager the ParserManager that instantiated this thread.
     */
    public ParserThread(Socket socket, BufferManager buffer, Extrapolation extrapolation, int threadID, ParserManager manager) {
        this.socket = socket;
        this.buffer = buffer;
        this.extrapolation = extrapolation;
        this.threadID = threadID;
        this.parserThreadManager = manager;
        array = new int[7];
    }

    /**
     * Run method that reads incoming inputStream and parses it. Parsed data is then passed through to the BufferManager.
     */
    public void run() {
        try {
            // Create a buffered reader
            bin = new BufferedReader(new InputStreamReader(socket.getInputStream()));

            // Declare the necessary variables
            String line;
            String result;
            int station_nr;
            String temporary;

            // This continues until the socket stops sending data, if the socket stops the socket will be closed.
            while((line = bin.readLine()) != null){
                if (bin.ready()){
                    if (line.contains("</MEASUREMENT>")) {
                        buffer.addToQueue(array);
                        array = new int[7];
                        pointer = 0;
                        line_count = 1;
                    } else {
                        if (!line.contains("MEASUREMENT") && !line.contains("WEATHERDATA") && !line.contains("<?")) {
                            result = line.substring(line.indexOf(">") + 1, line.indexOf("</"));

                            // Get the station number and fill the first three bytes of the integer.
                            station_nr = Integer.parseInt(result);
                            array[pointer] = station_nr << 12;

                            // Split the 'date' line of the XML message, parse and add to the integer array.
                            String[] date_pieces = readNextLineAndGetResult(station_nr).split("-");
                            array[pointer] = array[pointer] + Integer.parseInt(date_pieces[0]);
                            pointer++;
                            array[pointer] = ((Integer.parseInt(date_pieces[1])+ 16) << 22) + (Integer.parseInt(date_pieces[2]) << 17);

                            // Split the 'time' line of the XML message, parse and add to the integer array.
                            date_pieces = readNextLineAndGetResult(station_nr).split(":");
                            array[pointer] = array[pointer] + (Integer.parseInt(date_pieces[0]) << 12) + (Integer.parseInt(date_pieces[1]) << 6) + Integer.parseInt(date_pieces[2]);
                            pointer++;

                            // Parse the temperature
                            temporary = readNextLineAndGetResult(station_nr);
                            parseTempAndDewPoint(temporary, station_nr, true);
                            line_count++;

                            // Parse the dew point
                            temporary = readNextLineAndGetResult(station_nr);
                            parseTempAndDewPoint(temporary, station_nr, false);
                            line_count++;

                            while(line_count != 9){
                                parseDouble(readNextLineAndGetResult(station_nr), station_nr);
                                line_count++;
                            }

                            temporary = readNextLineAndGetResult(station_nr);
                            if(temporary.equals("0.0")){
                                temporary = "000000";
                            }
                            array[pointer] = ((Integer.parseInt(temporary, 2) + 64) << 25);
                            line_count++;

                            array[pointer] = array[pointer] + (((int) (Double.parseDouble(readNextLineAndGetResult(station_nr)) * 10)) << 11);
                            line_count++;

                            array[pointer] = array[pointer] + (int) Double.parseDouble(readNextLineAndGetResult(station_nr));
                        }
                    }
                }
            }
            // Remove when socket is not connected
            socket.close();
            parserThreadManager.removeWorker();
            Thread.currentThread().interrupt();
        } catch (java.io.IOException ioe) {
            parserThreadManager.removeWorker();
            System.err.println(ConsoleColors.getTimeString() + "IOException occurred in parser thread : " + ioe);
            Thread.currentThread().interrupt();
        }
    }

    /**
     * Method that reads the next line and returns the result.
     * @param station_nr int containing station number of data being parsed.
     * @return String with result of next line.
     * @throws IOException
     */
    private String readNextLineAndGetResult(int station_nr) throws IOException {
        String line = bin.readLine();
        String result = line.substring(line.indexOf(">") + 1, line.indexOf("</"));
        if (result.equals("")) {
            result = extrapolation.getEWMA(station_nr, line_count) + "";
        }
        return result;
    }

    /**
     * Method to parse Temperature and Dewpoint.
     * @param result String with result to be parsed.
     * @param station_nr int containing station number of data being parsed.
     * @param tempOrNot boolean to determine if data is temp or not.
     */
    private void parseTempAndDewPoint(String result, int station_nr, boolean tempOrNot){
        if (result.equals("")) {
            result = extrapolation.getEWMA(station_nr, line_count) + "";
        }
        double_val = Double.parseDouble(result);
        extrapolation.calculateEWMA(station_nr, line_count, double_val);
        int temporary = (int) (double_val * 10);
        temporary += 700;
        if(tempOrNot) {
            array[pointer] = (temporary << 16);
        }
        else{
            array[pointer] = array[pointer] + temporary;
            pointer++;
        }
    }

    /**
     * Method to parse a Double.
     * @param result String with result containing a double to be parsed.
     * @param station_nr int containing station number of data being parsed.
     */
    private void parseDouble(String result, int station_nr){
        if (result.equals("")) {
            result = extrapolation.getEWMA(station_nr, line_count) + "";
        }
        double_val = Double.parseDouble(result);
        extrapolation.calculateEWMA(station_nr, line_count, double_val);

        int temporary;
        if(line_count == 7){
            temporary = (int) (double_val * 100);
        }
        else {
            temporary = (int) (double_val * 10);
        }

        if(line_count % 2 != 0) {
            array[pointer] = (temporary << 16);
        }
        else{
            array[pointer] = array[pointer] + temporary;
            pointer++;
        }
    }
}
