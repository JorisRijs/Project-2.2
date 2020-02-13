package raspParser;
import java.util.HashMap;
import java.util.function.Function;

/**
 * Class that contains methods used for extrapolation of missing data.
 */
public class Extrapolation {

    private HashMap<Integer, double[]> weighted_average = new HashMap<>();
    private Function<Integer, double[]> function = (k) -> new double[12];

    /**
     * Method to calculate the Exponential Weighted Moving Average
     * @param station_nr
     * @param index
     * @param value
     */
    public synchronized void calculateEWMA(int station_nr, int index, double value){
        weighted_average.computeIfAbsent(station_nr, function);
        if (this.weighted_average.get(station_nr)[index] == 0.0) {
            this.weighted_average.get(station_nr)[index] = value;
        }
        double estimate = (double) Math.round(((0.8 * this.weighted_average.get(station_nr)[index]) + (0.2 * value)) * 100) / 100;
        weighted_average.get(station_nr)[index] = estimate;
    }

    /**
     * Method that returns the Exponential Weighted Moving Average of a value of a station
     * @param station_nr
     * @param index
     * @return double
     */
    public synchronized double getEWMA(int station_nr, int index){
        weighted_average.computeIfAbsent(station_nr, function);
        if(weighted_average.get(station_nr) == null){
            weighted_average.put(station_nr, new double[12]);
            this.weighted_average.get(station_nr)[index] = 0.0;
        }
        return weighted_average.get(station_nr)[index];
    }
}