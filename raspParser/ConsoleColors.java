package raspParser;

import java.time.LocalTime;
import java.time.temporal.ChronoUnit;

/**
 * This class contains constants used to give some colors to console output. It also contains a method to generate a
 * string with the current local time.
 */
public class ConsoleColors {
    public static final String ANSI_RESET = "\u001b[0m";
    public static final String ANSI_BLACK = "\u001b[30m";
    public static final String ANSI_RED = "\u001b[31m";
    public static final String ANSI_GREEN = "\u001b[32m";
    public static final String ANSI_YELLOW = "\u001b[33m";
    public static final String ANSI_BLUE = "\u001b[34m";
    public static final String ANSI_PURPLE = "\u001b[35m";
    public static final String ANSI_CYAN = "\u001b[36m";
    public static final String ANSI_WHITE = "\u001b[37m";
    public static final String ANSI_BRIGHT_BLACK = "\u001b[90m";
    public static final String ANSI_BRIGHT_RED = "\u001b[91m";
    public static final String ANSI_BRIGHT_GREEN = "\u001b[92m";
    public static final String ANSI_BRIGHT_YELLOW = "\u001b[93m";
    public static final String ANSI_BRIGHT_BLUE = "\u001b[94m";
    public static final String ANSI_BRIGHT_PURPLE = "\u001b[95m";
    public static final String ANSI_BRIGHT_CYAN = "\u001b[96m";
    public static final String ANSI_BRIGHT_WHITE = "\u001b[97m";
    public static final String ANSI_BG_BLACK = "\u001b[40m";
    public static final String ANSI_BG_RED = "\u001b[41m";
    public static final String ANSI_BG_GREEN = "\u001b[42m";
    public static final String ANSI_BG_YELLOW = "\u001b[43m";
    public static final String ANSI_BG_BLUE = "\u001b[44m";
    public static final String ANSI_BG_PURPLE = "\u001b[45m";
    public static final String ANSI_BG_CYAN = "\u001b[46m";
    public static final String ANSI_BG_WHITE = "\u001b[47m";
    public static final String ANSI_BRIGHT_BG_BLACK = "\u001b[100m";
    public static final String ANSI_BRIGHT_BG_RED = "\u001b[101m";
    public static final String ANSI_BRIGHT_BG_GREEN = "\u001b[102m";
    public static final String ANSI_BRIGHT_BG_YELLOW = "\u001b[103m";
    public static final String ANSI_BRIGHT_BG_BLUE = "\u001b[104m";
    public static final String ANSI_BRIGHT_BG_PURPLE = "\u001b[105m";
    public static final String ANSI_BRIGHT_BG_CYAN = "\u001b[106m";
    public static final String ANSI_BRIGHT_BG_WHITE = "\u001b[107m";

    /**
     * Method that generates and returns a nice colored string containing the current local time.
     * @return String
     */
    public static String getTimeString() {
        return ANSI_BG_WHITE + ANSI_BLACK + "[" + LocalTime.now().truncatedTo(ChronoUnit.SECONDS) + "]" + ANSI_RESET + ANSI_WHITE + " ";
    }
}
