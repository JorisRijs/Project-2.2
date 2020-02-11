package ServerApplication;

/**
 * Main class that is used to run the server application
 */
public class Main {
    public static void main(String[] args){
        Comparator comparator = new Comparator();
        ServerParser parser = new ServerParser(comparator);
        parser.run();
    }
}
