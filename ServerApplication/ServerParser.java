package ServerApplication;

import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Objects;

public class ServerParser {

    private String location4 = "/etc/DataStore/General/";
    private String web_site_dir = "/etc/DataStore/Website/";
    private File folder = new File("/etc/DataStore/General/");
    private File folder2 = new File("/etc/DataStore/General/");
    private String dest_dir = "/etc/DataStore/Other/";
    private String src_dir = "/etc/DataStore/General/";

    private Comparator comparator;

    public ServerParser(){
        comparator = new Comparator();
    }

    public void run(){
        HashMap<Integer, String> listEEU = comparator.getStationsEEU();
        HashMap<Integer, String> listMoldova = comparator.getStationsMOLDOVA();
        int limit;
        int stp_slp;
        double stp;
        double slp;

        String temp;
        Date date;
        SimpleDateFormat format;
        FileOutputStream outputFile;
        PrintStream out;
        DataInputStream input;
        FileInputStream in;

        while(true) {
            if(Objects.requireNonNull(folder2.listFiles()).length > 0) {
                try {
                    for (final File fileEntry : Objects.requireNonNull(folder2.listFiles())) {
                        if (!fileEntry.isDirectory()) {
                            if ((fileEntry.isFile()) && (fileEntry.getName().substring(fileEntry.getName().lastIndexOf(".") + 1).equals("b")) && fileEntry.length() > 0) {
                                limit = (int) fileEntry.length() / 28;
                                in = new FileInputStream(fileEntry.getPath());
                                input = new DataInputStream(in);

                                StringBuilder string = new StringBuilder();

                                date = new Date();
                                format = new SimpleDateFormat("yyyy-MM-dd_HH_mm_ss");

                                outputFile = new FileOutputStream(web_site_dir + format.format(date) + ".txt");
                                out = new PrintStream(outputFile);

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
                                        slp = (double) ((Integer.parseInt(temp.substring(16, 32), 2)) / 10);

                                        string.append(stp);
                                        string.append('_');
                                        string.append(slp);
                                        out.println(string.toString());
                                        string.setLength(0);

                                    } else if (listMoldova.containsKey(stn)) {

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
                                        out.println(string.toString());
                                        string.setLength(0);
                                    }
                                }
                                if (!format.format(date).equals(format.format(new Date()))) {
                                    out.close();
                                    outputFile.close();
                                }

                                input.close();
                                in.close();

                                if (new File(dest_dir + fileEntry.getName()).exists()) {
                                    Files.delete(Path.of(dest_dir + fileEntry.getName()));
                                    Files.move(Path.of(src_dir + fileEntry.getName()), Path.of(dest_dir + fileEntry.getName()));
                                } else {
                                    Files.move(Path.of(src_dir + fileEntry.getName()), Path.of(dest_dir + fileEntry.getName()));
                                }
                            }
                            else{
                                Files.delete(Path.of(src_dir + fileEntry.getName()));
                            }
                        }
                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    private static String fillBinaryString(String binaryString){
        int length = binaryString.length();
        String temp = "";
        if(length > 0 && length < 33) {
            temp = "0".repeat(32 - length);
        }
        temp += binaryString;
        return temp;
    }
}
