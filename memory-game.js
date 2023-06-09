const container = document.querySelector('.game-container');
const cards = [];
let flippedcard = false;
let lockboard = false;
let firstCard, secondCard;
let matchedCards = 0;
let flips = 0;

function getNumberOfCards() {
  let numberOfCards = parseInt(prompt("Com quants cartas você quer jogar?"));
  while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = parseInt(prompt("Por favor digite um número par entre 2-14"));
  }
  return numberOfCards;
}

const numberOfCards = getNumberOfCards();

function flipCard() {
  if (lockboard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!flippedcard) {
    flippedcard = true;
    firstCard = this;
    flips++;
    return;
  }

  secondCard = this;
  flips++;
  checkforMatch();
}

function checkforMatch() {

  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework

  if (isMatch) {
    disableCards();
  } else {
    unflipCards();
  }
}

function disableCards() {

  firstCard.classList.add('match');
  secondCard.classList.add('match');
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  matchedCards++;
  flippedcard = false;

  if (matchedCards === numberOfCards / 2) {
    setTimeout(() => {
      alert(`Parabéns! Você ganhou em ${flips} jogadas!.`);
    }, 200);
  }

  resetBoard();

  lockboard = false; 
}

function unflipCards() {
  lockboard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();

    lockboard = false; 
  }, 1000);
}

function resetBoard() {

  [flippedcard, lockboard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

for (let i = 1; i <= numberOfCards; i++) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.framework = 'image' + Math.ceil(i/2);
    card.dataset.test = 'card';
    card.innerHTML = `
      <img class="front" src="./imagens/image${Math.ceil(i/2)}.gif" data-test="face-up-image">
      <img class="back" src="./imagens/back.png" data-test="face-down-image">
    `;
    card.addEventListener('click', flipCard);
    cards.push(card);
}

for (let i = cards.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [cards[i], cards[j]] = [cards[j], cards[i]];
}

cards.forEach(card => container.appendChild(card));

console.log(`Number of cards in the deck: ${numberOfCards}`);
