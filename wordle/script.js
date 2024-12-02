document.addEventListener('DOMContentLoaded', () => {
    const targetWord = "plane";
    const grid = document.getElementById('wordle-grid');
    const keys = document.querySelectorAll('.key');
    let currentRow = 0;
    let currentCell = 0;
    let currentGuess = "";

    function updateCell(letter) {
        const row = grid.children[currentRow];
        if (currentCell < 5 && letter !== "Backspace" && letter !== "Enter") {
            row.children[currentCell].textContent = letter;
            currentGuess += letter;
            currentCell++;
        } else if (letter === "Backspace" && currentCell > 0) {
            currentCell--;
            row.children[currentCell].textContent = "";
            currentGuess = currentGuess.slice(0, -1);
        } else if (letter === "Enter" && currentCell === 5) {
            checkGuess();
        }
    }

    function checkGuess() {
        const row = grid.children[currentRow];
        const letterCount = {};
        
        // Count each letter in the target word for yellow placement
        for (let char of targetWord) {
            letterCount[char] = (letterCount[char] || 0) + 1;
        }
        
        // Mark cells as correct (green) first
        for (let i = 0; i < 5; i++) {
            const cell = row.children[i];
            const letter = currentGuess[i];
            
            if (letter === targetWord[i]) {
                cell.classList.add("correct");
                letterCount[letter]--;
            }
        }
        
        // Mark cells as present (yellow) or absent (grey) next
        for (let i = 0; i < 5; i++) {
            const cell = row.children[i];
            const letter = currentGuess[i];
            
            if (!cell.classList.contains("correct")) {
                if (targetWord.includes(letter) && letterCount[letter] > 0) {
                    cell.classList.add("present");
                    letterCount[letter]--;
                } else {
                    cell.classList.add("absent");
                }
            }
        }

        if (currentGuess === targetWord) {
            alert("Congratulations! You guessed the word!");
        } else if (currentRow < 5) {
            currentRow++;
            currentCell = 0;
            currentGuess = "";
        } else {
            alert("Game over! The word was " + targetWord);
        }
    }

    keys.forEach(key => {
        key.addEventListener('click', () => {
            const letter = key.textContent;
            updateCell(letter);
        });
    });
});
