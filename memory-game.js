const container = document.querySelector('.game-container');
const cards = [];
let flippedcard = false;
let lockboard = false;
let firstCard, secondCard;
let matchedCards = 0;
let flips = 0;

function getNumberOfCards() {
  let numberOfCards = parseInt(prompt("How many cards do you want to play with? (4-14, even numbers only)"));
  while (numberOfCards < 4 || numberOfCards > 14 || numberOfCards % 2 !== 0) {
    numberOfCards = parseInt(prompt("Please enter an even number between 4 and 14."));
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
      alert(`Você ganhou em ${flips} jogadas!.`);
    }, 200);
  }

  resetBoard();

  lockboard = false; // reset lockboard to false
}

function unflipCards() {
  lockboard = true;

  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');

    resetBoard();

    lockboard = false; // reset lockboard to false
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
  card.innerHTML = `
    <img class="front" src="imagens/image${Math.ceil(i/2)}.gif">
    <img class="back" src="./imagens/back.png">
  `;
  card.addEventListener('click', flipCard);
  cards.push(card);
}

cards.forEach(card => {
  let randomPos = Math.floor(Math.random() * numberOfCards);
  card.style.order = randomPos;
  container.appendChild(card);
});

cards.forEach(card => card.addEventListener('click', flipCard));




console.log(`Number of cards in the deck: ${numberOfCards}`);


function shuffle() {
    const cardData = [];
    for (let i = 1; i <= numberOfCards / 2; i++) {
      cardData.push({
        framework: 'image' + i,
        imageSrc: `./imagens/image${i}.gif`
      });
      cardData.push({
        framework: 'image' + i,
        imageSrc: `./imagens/image${i}.gif`
      });
    }
  
    for (let i = cardData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardData[i], cardData[j]] = [cardData[j], cardData[i]];
    }
  
    for (let i = 0; i < numberOfCards; i++) {
      const card = document.createElement('div');
      card.className = 'card';
      card.dataset.framework = cardData[i].framework;
      card.innerHTML = `
        <img class="front" src="${cardData[i].imageSrc}">
        <img class="back" src="./imagens/back.png">
      `;
      card.addEventListener('click', flipCard);
      cards.push(card);
    }
  
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * numberOfCards);
      card.style.order = randomPos;
      container.appendChild(card);
    });
  }
  