package raspParser.Buffer;

import raspParser.ConsoleColors;

import java.io.*;
import java.util.Queue;

/**
 * This is a runnable method that is used to convert data in to files.
 */
public class BufferThread implements Runnable{

    private Queue<int[]> queue;

    // Some locations to write data files to
    private static String location = "/etc/DataStore/General/";
    private static String location2 = "E:/test/";
    private static String location3 = "/home/dietpi/test/";
    private static String location4 = "/mnt/DataStore/etc/DataStore/General/";

    private int counter = 0;

    /**
     * Constructor for the BufferThread class.
     * @param queue the queue containing data to be written.
     */
    public BufferThread(Queue<int[]> queue){
        this.queue = queue;
    }

    /**
     * Run method waiting for a interrupt. When this class gets interrupted it starts writing a file, if there is
     * anything to write.
     */
    public void run(){
        while(true){
            try{
                System.out.println(ConsoleColors.getTimeString() + "size of queue : " + ConsoleColors.ANSI_YELLOW + queue.size() + ConsoleColors.ANSI_RESET);
                Thread.sleep(1000);
            } catch (InterruptedException e){
                if(queue.size() > 0){
                    writeFile();
                }
            }
        }
    }

    /**
     * This method takes the first fileSize amount of instances from the queue and writes them to a file.
     * int fileSize determines how many pieces of data get written.
     */
    private void writeFile(){
        try{
            FileOutputStream outputFile = new FileOutputStream(location3 + counter + ".b");
            BufferedOutputStream out = new BufferedOutputStream(outputFile);
            int size = queue.size();
            DataOutputStream os = new DataOutputStream(out);
            for(int i=1; i < size; i++){
                //int[] tmp = this.queue.remove(1);
                int[] tmp = this.queue.poll();
                if(i % (size / 10) == 0 && size > 100){
                    // Print writing progress
                    System.out.println(ConsoleColors.getTimeString() + ConsoleColors.ANSI_YELLOW + i / (size / 100) + "%" + ConsoleColors.ANSI_WHITE + " done writing " + size + " weather messages" + ConsoleColors.ANSI_RESET);
                }
                if(tmp != null){
                    os.writeInt(tmp[0]);
                    os.writeInt(tmp[1]);
                    os.writeInt(tmp[2]);
                    os.writeInt(tmp[3]);
                    os.writeInt(tmp[4]);
                    os.writeInt(tmp[5]);
                    os.writeInt(tmp[6]);
                }
            }
            counter++;
            out.flush();
            outputFile.close();
            System.out.println(ConsoleColors.getTimeString() + ConsoleColors.ANSI_YELLOW + "100%" + ConsoleColors.ANSI_WHITE + " done writing " + size + " weather messages" + ConsoleColors.ANSI_RESET);
            System.err.println(ConsoleColors.getTimeString() + "wrote a file with ID " + ConsoleColors.ANSI_YELLOW + counter);
        } catch (IOException ioe){
            System.out.println(ConsoleColors.getTimeString() + ConsoleColors.ANSI_BRIGHT_RED + "IO exception while writing file : " + ioe + ConsoleColors.ANSI_RESET);
        }
    }
}
