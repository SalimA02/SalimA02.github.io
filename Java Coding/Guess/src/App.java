import java.util.Random;
import java.util.Scanner;

public class App {
    public static void main(String[] args) { 
        Scanner scanner = new Scanner(System.in); 
        Random random = new Random(); 
        
        int randomNumber = random.nextInt(100) + 1;
        int attempts = 0;
        boolean hasGuessedCorrectly = false;
        
        System.out.println("Welcome to the Guessing Game!");
        System.out.println("I'm thinking of a number between 1 and 100.");
        
        while (!hasGuessedCorrectly) {
            System.out.print("Enter your guess: ");
            int userGuess = scanner.nextInt();
            attempts++;
            
            if (userGuess < randomNumber) {
                System.out.println("Too low! Try again.");
            } else if (userGuess > randomNumber) {
                System.out.println("Too high! Try again.");
            } else {
                hasGuessedCorrectly = true;
                System.out.println("Congratulations! You've guessed the number in " + attempts + " attempts.");
            }
        }
        
        scanner.close();
    }
}
