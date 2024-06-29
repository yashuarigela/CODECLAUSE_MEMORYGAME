const cards = [
    'fa-diamond', 'fa-diamond',
    'fa-paper-plane-o', 'fa-paper-plane-o',
    'fa-anchor', 'fa-anchor',
    'fa-bolt', 'fa-bolt',
    'fa-cube', 'fa-cube',
    'fa-leaf', 'fa-leaf',
    'fa-bicycle', 'fa-bicycle',
    'fa-bomb', 'fa-bomb'
];

let deck = document.getElementById('deck');
let movesElement = document.querySelector('.moves');
let timeElement = document.querySelector('.timer');
let resetButton = document.getElementById('reset');
let openCards = [];
let matchedCards = [];
let moves = 0;
let seconds = 0;
let timer;

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function startGame() {
    console.log('Starting game'); // Log for debugging
    let shuffledCards = shuffle(cards);
    deck.innerHTML = ''; // Clear the deck
    for (let i = 0; i < shuffledCards.length; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.card = shuffledCards[i];
        card.innerHTML = `<i class="fa ${shuffledCards[i]}"></i>`;
        deck.appendChild(card);
        console.log('Card created:', card); // Log each card element
        card.addEventListener('click', handleCardClick);
    }
    resetGame();
}

function handleCardClick(event) {
    let clickedCard = event.target;
    if (clickedCard.classList.contains('open') || openCards.length === 2) return;

    clickedCard.classList.add('open');
    openCards.push(clickedCard);

    if (openCards.length === 2) {
        moves++;
        movesElement.innerText = `${moves} Moves`;
        if (openCards[0].dataset.card === openCards[1].dataset.card) {
            openCards[0].classList.add('match');
            openCards[1].classList.add('match');
            matchedCards.push(openCards[0]);
            matchedCards.push(openCards[1]);
            openCards = [];
            if (matchedCards.length === cards.length) {
                clearInterval(timer);
                alert('Congratulations! You won!');
            }
        } else {
            setTimeout(() => {
                openCards[0].classList.remove('open');
                openCards[1].classList.remove('open');
                openCards = [];
            }, 1000);
        }
    }
}

function resetGame() {
    openCards = [];
    matchedCards = [];
    moves = 0;
    movesElement.innerText = '0 Moves';
    seconds = 0;
    timeElement.innerText = '0s';
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        timeElement.innerText = `${seconds}s`;
    }, 1000);
}

resetButton.addEventListener('click', startGame);

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed'); // Log for debugging
    startGame();
});
