document.addEventListener("DOMContentLoaded", function () {
    const words = ["hangman", "javascript", "developer", "programming", "html", "css", "code"];

    let selectedWord = "";
    let guessedLetters = [];
    let maxAttempts = 7;
    let attemptsMade = 0; // Add this line to declare attemptsMade

    const wordContainer = document.getElementById("word-container");
    const guessesContainer = document.getElementById("guesses-container");
    const newGameBtn = document.getElementById("new-game-btn");
    

    function newGame() {
        // Reset variables
        selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
        guessedLetters = [];
        maxAttempts = 7;
        attemptsMade = 0;

        document.getElementById("letter-input").value = "";
        // Display dashes for the word
        displayWord();

        // Clear guesses
        updateGuesses();

        // Enable input
        document.addEventListener("keydown", handleGuess);

        // Display new game button
        newGameBtn.style.display = "none";
    }

    function displayWord() {
        let displayText = "";
        for (const char of selectedWord) {
            if (guessedLetters.includes(char)) {
                displayText += char + " ";
            } else {
                displayText += "_ ";
            }
        }
        wordContainer.textContent = displayText.trim();
    }

    function updateGuesses() {
        guessesContainer.textContent = `Incorrect Guesses (Limit: ${maxAttempts}): ${guessedLetters.join(", ")} (${attemptsMade})`;
    }

    function handleGuess(event) {
        const guess = event.key.toUpperCase();
    
        if (isAlpha(guess) && guessedLetters.indexOf(guess) === -1) {
            guessedLetters.push(guess);
    
            if (selectedWord.indexOf(guess) === -1) {
                attemptsMade++;
    
                if (attemptsMade >= maxAttempts) {
                    endGame(false);
                    document.getElementById("letter-input").disabled = true;
                return;
            }
                    
            }
    
            displayWord();
            updateGuesses();
    
            if (!wordContainer.textContent.includes("_")) {
                endGame(true);
            }
        }
    }

    function endGame(isWinner) {
        document.removeEventListener("keydown", handleGuess);
    
        if (isWinner) {
            wordContainer.textContent = `Congratulations! You guessed the word "${selectedWord}"!`;
        } else {
            guessesContainer.textContent = `Incorrect Guesses: ${guessedLetters.join(", ")} (${attemptsMade})`;
            wordContainer.textContent = `Game Over! The word was "${selectedWord}".`;
        }
    
        // Reset game state
        newGameBtn.style.display = "block";
        selectedWord = "";
        guessedLetters = [];
        maxAttempts = 7;
        attemptsMade = 0;
        
        
    }

    function isAlpha(char) {
        return /^[A-Z]$/i.test(char);
    }

    // Start a new game when the page loads
    newGame();

    // Add click event listener to the New Game button
    newGameBtn.addEventListener("click", newGame);
});
