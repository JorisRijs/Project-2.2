package raspParser.Buffer;

import raspParser.Timer;

import java.util.ArrayList;
import java.util.List;

/**
 * Manager class for the buffer thread.
 */
public class BufferManager {

    private List<int[]> queue = new ArrayList<>();

    /**
     * Constructor for the BufferManager class.
     */
    public BufferManager(){
        Thread worker = new Thread(new BufferThread(queue));
        worker.setPriority(10);
        worker.start();

        Thread timer = new Thread(new Timer(worker));
        timer.start();
    }

    /**
     * This method is used to add a data sequence to the queue. If the queue is big enough it interrupts a bufferThread
     * so it can start processing the queue.
     * @param sequence int array containing data.
     */
    public void addToQueue(int[] sequence) {
        this.queue.add(sequence);
    }
}
