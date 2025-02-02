        // Contador de tempo juntos
        const startDate = new Date(2019, 11, 27); // Data do início do namoro
        const counterElement = document.getElementById('counter');
        const timeCounterElement = document.getElementById('time-counter');

        function updateCounter() {
            const now = new Date();
            let years = now.getFullYear() - startDate.getFullYear();
            let months = now.getMonth() - startDate.getMonth();
            let days = now.getDate() - startDate.getDate();

            if (days < 0) {
                months -= 1;
                const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
                days += previousMonth.getDate();
            }

            if (months < 0) {
                years -= 1;
                months += 12;
            }

            counterElement.textContent = `${years} anos, ${months} meses, ${days} dias`;
        }

        function updateTimeCounter() {
            const now = new Date();
            const diff = now - startDate;
            const seconds = Math.floor(diff / 1000) % 60;
            const minutes = Math.floor(diff / (1000 * 60)) % 60;
            const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;


            timeCounterElement.textContent = `${hours} horas, ${minutes} minutos e ${seconds} segundos`;
        }

        updateCounter();
        setInterval(updateCounter, 1000);
        setInterval(updateTimeCounter, 1000); // Atualiza a contagem de tempo a cada segundo

        // Galeria automática
        const gallery = document.querySelector('.gallery');
        const images = document.querySelectorAll('.gallery img');
        let index = 0;

        function updateGallery() {
            index = (index + 1) % images.length;
            gallery.style.transform = `translateX(-${index * 100}%)`;
        }

        setInterval(updateGallery, 3500);

        // Animação de corações com limite maior
        const maxHearts = 15; // Limite maior de corações
        const heartElements = [];

        function createHeart() {
            if (heartElements.length >= maxHearts) return;

            const heart = document.createElement('div');
            heart.classList.add('heart');
            heart.textContent = '❤️';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${Math.random() * 3 + 4}s`;
            document.body.appendChild(heart);
            heartElements.push(heart);

            heart.addEventListener('animationend', () => {
                heart.remove();
                heartElements.splice(heartElements.indexOf(heart), 1);
            });
        }

        setInterval(createHeart, 600); // Corações aparecendo mais rápido

        // Controle de reprodução de música
        const playButton = document.getElementById('play-button');
        const audioPlayer = document.getElementById('audio-player');

        playButton.addEventListener('click', () => {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playButton.style.display = 'none'; // Esconde o botão após clicar
            }
        });

        const secretWord = "TEAMO";
let guessedWord = Array(secretWord.length).fill("_");
let attempts = 6;

const wordDisplay = document.getElementById("word-display");
const lettersContainer = document.getElementById("letters-container");
const hangmanElement = document.getElementById("hangman");
const message = document.getElementById("message");

function updateWordDisplay() {
    wordDisplay.textContent = guessedWord.join(" ");
}

function createLetterButtons() {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (let letter of alphabet) {
        const button = document.createElement("button");
        button.textContent = letter;
        button.classList.add("letter-btn");
        button.addEventListener("click", () => guessLetter(letter, button));
        lettersContainer.appendChild(button);
    }
}

function guessLetter(letter, button) {
    let correct = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === letter) {
            guessedWord[i] = letter;
            correct = true;
        }
    }

    button.classList.add(correct ? "correct" : "wrong");
    button.disabled = true;

    if (!correct) {
        attempts--;
        updateHangman();
    }
    updateWordDisplay();
    checkGameStatus();
}

function updateHangman() {
    const hangmanStages = [
        `

  +---+
  |   |
      |
      |
      |
      |
=========`,
        `

  +---+
  |   |
  O   |
      |
      |
      |
=========`,
        `

  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
        `

  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
        `

  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
        `

  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
        `

  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
    ];
    hangmanElement.innerHTML = `<pre>${hangmanStages[6 - attempts]}</pre>`;
}

function checkGameStatus() {
    if (guessedWord.join("") === secretWord) {
        message.textContent = "HAHAHAHAHAH ACERTOUUUU!!! TE AMO ❤️";
        message.style.color = "green";
        disableAllButtons();
    } else if (attempts <= 0) {
        message.textContent = `ERROUUU!!! NÃO ME AMA MAIS 😢.`;
        message.style.color = "red";
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll(".letter-btn");
    buttons.forEach(button => button.disabled = true);
}

createLetterButtons();
updateWordDisplay();
