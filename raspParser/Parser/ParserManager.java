package raspParser.Parser;

import raspParser.Buffer.BufferManager;
import raspParser.ConsoleColors;
import raspParser.Extrapolation;

import java.net.Socket;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

/**
 * Manager class for ParserThread.
 * Instantiates a threadpool and creates ParserThreads.
 */
public class ParserManager implements Runnable {
    private int workerCount = 0;
    private ExecutorService threadpool;

    /**
     * Constructor for the ParserManager class.
     */
    public ParserManager(){
        // Start the threadpool
        this.threadpool = Executors.newFixedThreadPool(800);
    }

    /**
     * This run method prints the workerCount every second.
     */
    public void run() {
        while(true) {
            System.out.println(ConsoleColors.getTimeString() + "Total amount of parser threads : " + ConsoleColors.ANSI_YELLOW + this.getWorkerCount() + ConsoleColors.ANSI_RESET);
            try {
                Thread.sleep(1000);
            } catch (InterruptedException ie) {
                System.out.println(ConsoleColors.getTimeString() + "Interrupted sleep in ParserManager : " + ie);
            }
        }
    }

    /**
     * Method that creates and executes a new ParserThread.
     * @param socket the Socket connecting.
     * @param buffer the BufferManager class used.
     * @param extrapolation the Extrapolation class used.
     * @param threadID int used as an identifier.
     * @return boolean that indicates whether creation was successful.
     */
    public synchronized boolean createWorker(Socket socket, BufferManager buffer, Extrapolation extrapolation, int threadID) {
        try {
            Thread worker = new Thread(new ParserThread(socket, buffer, extrapolation, threadID, this));
            threadpool.execute(worker);
            workerCount++;
            return true;
        } catch (Exception e) {
            System.err.println(ConsoleColors.getTimeString() + "Exception while creating worker : " + e);
            return false;
        }
    }

    /**
     * Method that returns amount of parser threads.
     * @return int with workerCount.
     */
    public int getWorkerCount() {
        return workerCount;
    }

    /**
     * Method that decrements workerCount
     */
    public synchronized void removeWorker() {
        this.workerCount--;
    }
}
