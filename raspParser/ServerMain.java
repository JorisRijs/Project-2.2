package raspParser;
import raspParser.Buffer.BufferManager;
import raspParser.Parser.ParserManager;

import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketTimeoutException;

/**
 * The ServerMain class will instantiate the necessary classes for this application. In addition it also handles
 * incoming connections and gives them to a ParserThread.
 */
public class ServerMain {
    // At this moment we set PORT 0 to let the ServerSocket automatically find a free port
    private static final int PORT = 0;

    public static void main(String[] args) {
        int threadID = 0;

        try {
            ServerSocket server = new ServerSocket(PORT);
            server.setSoTimeout(1000);
            BufferManager buffer = new BufferManager();
            Extrapolation extrapolationOptimalization = new Extrapolation();
            ParserManager parserManager = new ParserManager();
            Thread workerManagerThread = new Thread(parserManager);
            workerManagerThread.start();

            System.err.println("Started on port : " + server.getLocalPort());
            System.err.println(ConsoleColors.getTimeString() + ConsoleColors.ANSI_BRIGHT_RED + "Start accepting threads...." + ConsoleColors.ANSI_RESET);
            while(true) {
                try {
                    Socket socket = server.accept();
                    socket.setKeepAlive(true);
                    socket.setTcpNoDelay(true);
                    socket.setReceiveBufferSize(65536);

                    parserManager.createWorker(socket, buffer, extrapolationOptimalization, threadID);
                    threadID++;
                } catch(SocketTimeoutException ste){
                    // Connecting to socket timed out, do nothing.
                }
            }
        } catch (IOException ioe) {
            System.err.println(ConsoleColors.getTimeString() + ConsoleColors.ANSI_BRIGHT_RED + "Exception while starting server " + ioe + ConsoleColors.ANSI_RESET);
        }
    }
}