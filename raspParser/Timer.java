package raspParser;

/**
 * This timer is used to interrupt a buffer thread on a interval.
 */
public class Timer implements Runnable{

    // Interval set to 10 seconds
    private final int interval = 10000;
    private Thread bufferThread;

    public Timer(Thread buffer){
        this.bufferThread = buffer;
    }

    public void run(){
        while(true){
            try{
                Thread.sleep(interval);
                bufferThread.interrupt();
            } catch(InterruptedException e){
                // Do nothing
            }
        }
    }
}
