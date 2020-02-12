package ServerApplication;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

/**
 * This class parses incoming files sent by the pi/
 */
public class ServerApplication {

    // Directories to be used in application
    private static final String location4 = "/etc/DataStore/General/";
    private static final String EEU_web_site_dir = "c:/temp/EasternEurope/";
    private static final String Moldova_web_site_dir = "c:/temp/Moldova/";
    private static final File folder = new File("/etc/DataStore/General");
    private static final File folder2 = new File("C:/temp/solelybinary/");
    private static final String dest_dir = "C:/temp/other_weather_data/";
    private static final String src_dir = "C:/temp/solelybinary/";

    private Comparator comparator;

    /**
     * Constructor method for the ServerApplication Class/
     */
    public ServerApplication(){
        comparator = new Comparator();
    }

    /**
     * The main method of this class. This method will parse incoming binary messages, decode the binary values
     * and write the values of weather stations located in Eastern Europe to a separate directory. The original
     * binary file will also be moved to another directory.
     */
    public void run(){
        HashMap<Integer, Double> listEEU = comparator.getStationsEEU();
        HashMap<Integer, String> listMoldova = comparator.getStationsMOLDOVA();
        int limit;
        int stp_slp;
        double stp;
        int moldova_counter;
        int file_counter = 0;

        String temp;
        Date date;
        SimpleDateFormat format;
        FileOutputStream outputFile;
        BufferedOutputStream out_buff;
        PrintStream out;
        DataInputStream input;
        FileInputStream in;

        while(true) {
            if(Objects.requireNonNull(folder2.listFiles()).length > 0) {
                try {
                    for (final File fileEntry : Objects.requireNonNull(folder2.listFiles())) {
                        if (!fileEntry.isDirectory()) {
                            if (Objects.requireNonNull(folder2.listFiles()).length > 1) {
                                if ((fileEntry.isFile()) && (fileEntry.getName().substring(fileEntry.getName().lastIndexOf(".") + 1).equals("b")) && fileEntry.length() > 0) {
                                    moldova_counter = 0;
                                    limit = (int) fileEntry.length() / 28;
                                    in = new FileInputStream(fileEntry.getPath());
                                    input = new DataInputStream(in);

                                    StringBuilder string = new StringBuilder();

                                    date = new Date();
                                    format = new SimpleDateFormat("yyyy-MM-dd_HH_mm");

                                    outputFile = new FileOutputStream(EEU_web_site_dir + format.format(date) + "=" + fileEntry.getName().substring(0,fileEntry.getName().length()-2) + ".txt");
                                    out_buff = new BufferedOutputStream(outputFile);
                                    out = new PrintStream(out_buff);

                                    for (int i = 0; i < limit; i++) {
                                        int bytes = input.readInt();
                                        String station_year = fillBinaryString(Integer.toBinaryString(bytes));
                                        int stn = Integer.parseInt(station_year.substring(0, 20), 2);

                                        if (listEEU.containsKey(stn)) {
                                            string.append(stn);
                                            string.append('_');

                                            input.readInt();
                                            input.readInt();

                                            stp_slp = input.readInt();
                                            temp = fillBinaryString(Integer.toBinaryString(stp_slp));

                                            stp = (double) ((Integer.parseInt(temp.substring(0, 16), 2)) / 10);

                                            if(listEEU.get(stn) == 0.0){
                                                listEEU.replace(stn, stp);
                                            }
                                            else{
                                                stp = (double) Math.round(0.8 * listEEU.get(stn)) + (0.2 * stp) * 100 / 100;
                                                listEEU.replace(stn, stp);
                                            }

                                            if(file_counter % 60 == 0) {
                                                string.append(stp);
                                                out.println(string.toString());
                                                string.setLength(0);
                                            }

                                            string.setLength(0);
                                            input.readLong();
                                            input.readInt();

                                        } else if (listMoldova.containsKey(stn)) {
                                            moldova_counter++;
                                            string.append(stn);
                                            string.append('_');

                                            input.readInt();

                                            int temp_dewp = input.readInt();
                                            temp = fillBinaryString(Integer.toBinaryString(temp_dewp));
                                            double dewp = (double) (Integer.parseInt(temp.substring(16, 32), 2) - 700) / 10;
                                            double temperature = (double) (Integer.parseInt(temp.substring(0, 16), 2) - 700) / 10;

                                            string.append(dewp);
                                            string.append('_');
                                            string.append(temperature);
                                            out.println(" ");
                                            out.println(string.toString());
                                            out.println(" ");
                                            string.setLength(0);

                                            input.readLong();
                                            input.readLong();

                                        } else {
                                            input.readLong();
                                            input.readLong();
                                            input.readLong();
                                        }
                                    }
                                    input.close();
                                    in.close();

                                    if (moldova_counter == 3) {
                                        out.close();
                                        out_buff.flush();
                                        outputFile.close();
                                    }

                                    if (new File(dest_dir + fileEntry.getName()).exists()) {
                                        Files.delete(Path.of(dest_dir + fileEntry.getName()));
                                        Files.move(Path.of(src_dir + fileEntry.getName()), Path.of(dest_dir + fileEntry.getName()));
                                    } else {
                                        Files.move(Path.of(src_dir + fileEntry.getName()), Path.of(dest_dir + fileEntry.getName()));
                                    }
                                    file_counter++;
                                } else {
                                    Files.delete(Path.of(src_dir + fileEntry.getName()));
                                }
                            }
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * Fill a bit string up to 32 bits. Adding additional zeros in order to work with a fixed format.
     * @param binaryString the binary string to be filled.
     * @return temp, the filled/ padded binary string.
     */
    private String fillBinaryString(String binaryString){
        int length = binaryString.length();
        String temp = "";
        if(length > 0 && length < 33) {
            temp = "0".repeat(32 - length);
        }
        temp += binaryString;
        return temp;
    }
}
