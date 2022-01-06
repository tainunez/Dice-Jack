'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores, currentScore, playing;
let activePlayer = 0;

//resets all values and elements
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player-bust');
  document
    .getElementById(`name--${activePlayer}`)
    .classList.remove('player-bust-text');

  document.getElementById(`name--${activePlayer}`).classList.add('name');

  document.getElementById(`name--${activePlayer}`).textContent = `Player ${
    activePlayer + 1
  }`;

  activePlayer = 0;
};

//switches to the next player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

init();

btnRoll.addEventListener('click', function () {
  if (playing) {
    //random number 1-6
    const dice = Math.trunc(Math.random() * 6) + 1;
    if (currentScore + dice <= 11) {
      //display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      //add score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else if (currentScore + dice > 11) {
      //stops the game
      playing = false;

      //if a person's current score exceeds 11 they lose
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player-bust');

      document.getElementById(`name--${activePlayer}`).classList.remove('name');

      document
        .getElementById(`name--${activePlayer}`)
        .classList.add('player-bust-text');

      //Display a "you lose message";
      document.getElementById(`name--${activePlayer}`).textContent = `Player ${
        activePlayer + 1
      } Busts!`;

      //display dice
      diceEl.classList.remove('hidden');
      diceEl.src = `dice-${dice}.png`;

      //add score to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. switch to the next player
    switchPlayer();
  }
  if (scores[0] && scores[1]) {
    //end the game
    playing = false;

    //display a message depending on which player wins
    scores[0] > scores[1]
      ? (document.querySelector('.modal').textContent = 'Player 1 Wins!')
      : (document.querySelector('.modal').textContent = 'Player 2 Wins!');
    openModal();
  }
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnNew.addEventListener('click', init);
