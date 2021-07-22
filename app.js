const bodyEl = document.querySelector('body');
const namePetButtonEl = document.querySelector('#name-pet-button');
const namePetFormEl = document.querySelector('#name-pet-form');
const namePetInputEl = document.querySelector('#name-pet-input');
const gameEl = document.querySelector('#game');
const messageEl = document.querySelector('#message');
const startButtonEl = document.querySelector('#start-game');
const pauseButtonEl = document.querySelector('#pause-game');
const feedButtonEl = document.querySelector('#feed-button');
const playButtonEl = document.querySelector('#play-button');
const lightsButtonEl = document.querySelector('#lights-button');
const petHungerEl = document.querySelector('#pet-hunger');
const petSleepinessEl = document.querySelector('#pet-sleepiness');
const petBoredomEl = document.querySelector('#pet-boredom');

let pet = {};
let count = 0;
let lightsOn = true;
let gameInPlay = false;
let timer;

class Tomagotchi {
  constructor(name) {
    this.name = name;
    this.age = 0;
    this.hunger = 0;
    this.sleepiness = 0;
    this.boredom = 0;
  }

  feed() {
    if (this.hunger > 0 && lightsOn && gameInPlay) {
      this.hunger--;
    }
  }

  play() {
    if (this.boredom > 0 && lightsOn && gameInPlay) {
      this.boredom--;
    }
  }

  getOlder() {
    this.age++;
  }
}

function createPet(petName) {
  return new Tomagotchi(petName);
}

function handlePetNaming() {
  const petName = namePetInputEl.value;

  namePetFormEl.classList.add('hide');
  gameEl.classList.remove('hide');

  pet = createPet(petName);
}

function renderStats() {
  petHungerEl.textContent = 'Hunger: ' + pet.hunger;
  petSleepinessEl.textContent = 'Sleepiness: ' + pet.sleepiness;
  petBoredomEl.textContent = 'Boredom: ' + pet.boredom;
}

function startGame() {
  startButtonEl.classList.add('hide');
  pauseButtonEl.classList.remove('hide');
  gameInPlay = true;
  messageEl.textContent = '';

  pet.hunger = 0;
  pet.sleepiness = 0;
  pet.boredom = 0;
  
  renderStats();

  timer = setInterval(function() {
    count++;

    pet.hunger++;
    pet.boredom++;

    if (lightsOn) {
      pet.sleepiness++;
    } else {
      if (pet.sleepiness > 0) {
        pet.sleepiness--;
      }
    }

    renderStats();

    checkForGameOver();
  }, 1000);
}

function pauseGame() {
  clearInterval(timer);
  pauseButtonEl.classList.add('hide');
  startButtonEl.classList.remove('hide');
  gameInPlay = false;
}

function resetGame() {
  clearInterval(timer);
  gameInPlay = false;
  messageEl.textContent = 'Game Over';
  pauseButtonEl.classList.add('hide');
  startButtonEl.classList.remove('hide');
}

function checkForGameOver() {
  if (
    pet.hunger >= 10
    || pet.sleepiness >= 10
    || pet.boredom >=10
  ) {
    resetGame();
  }
}

function feedPet() {
  pet.feed();
}

function playWithPet() {
  pet.play();
}

function switchLights() {
  lightsOn = !lightsOn;

  if (lightsOn) {
    bodyEl.classList.remove('lights-off')
  } else {
    bodyEl.classList.add('lights-off');
  }
}

startButtonEl.addEventListener('click', startGame);
pauseButtonEl.addEventListener('click', pauseGame);
playButtonEl.addEventListener('click', playWithPet);
feedButtonEl.addEventListener('click', feedPet);
lightsButtonEl.addEventListener('click', switchLights);
namePetButtonEl.addEventListener('click', handlePetNaming);


class Monster {
  constructor(name) {
    this.name = name;
    this.boredom = 0;
    this.hunger = 0;
    this.sleepiness = 0;
  }
}

// Inside startGame function
const myPet = new Monster('bob');

{
  name: 'bob',
  hunger: 0,
  sleepiness: 0,
  boredom: 0
}

function handleFeedClick() {
  myPet.hunger--;
}