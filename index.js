const containerDiv = document.querySelector('.container');
const hoursInput = document.querySelector('.input.hours input');
const minutesInput = document.querySelector('.input.minutes input');
const secondsInput = document.querySelector('.input.seconds input');

const incrementHoursElement = document.querySelector('.input.hours button.increment');
const incrementMinutesElement = document.querySelector('.input.minutes button.increment');
const incrementSecondsElement = document.querySelector('.input.seconds button.increment');

const decrementHoursElement = document.querySelector('.input.hours button.decrement');
const decrementMinutesElement = document.querySelector('.input.minutes button.decrement');
const decrementSecondsElement = document.querySelector('.input.seconds button.decrement');

const decrementElements = document.querySelectorAll('button.decrement');

const startTimerBtn = document.querySelector('#start');
const stopTimerBtn = document.querySelector('#stop');

const hoursView = document.querySelector('.view.hours .value p');
const minutesView = document.querySelector('.view.minutes .value p');
const secondsContainer = document.querySelector('.view.seconds');
const secondsView = document.querySelector('.view.seconds .value p');

let timer;
let paused = false;
let totalSeconds = 0;

function playSound() {
  const audio = new Audio('./assets/beep.mp3');
  audio.play();
}

function startTimer(h = 0, m = 0, s = 0) {
  paused = false;
  startTimerBtn.textContent = 'PAUSE';

  if (totalSeconds === 0) {
    totalSeconds = (h * 60 * 60) + (m * 60) + s
  }

  if (totalSeconds >= 5) {
    toggleHideContainer();
  }

  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds % 3600) / 60);
  let seconds = (totalSeconds % 3600) % 60;

  updateTimerView(hours, minutes, seconds);

  function updateTimer() {
    hours = Math.floor(totalSeconds / 3600);
    minutes = Math.floor((totalSeconds % 3600) / 60);
    seconds = (totalSeconds % 3600) % 60;
  }

  timer = setInterval(function () {
    totalSeconds--; // updates remaining time

    if (totalSeconds <= 5) {
      containerDiv.classList.remove('hidden');
    }

    if (totalSeconds === 0) {
      // play sound
      playSound();

      paused = false;
      startTimerBtn.textContent = 'START';
      updateTimer();
      updateTimerView(hours, minutes, seconds);
      clearInterval(timer);
      return;
    }

    updateTimer();
    updateTimerView(hours, minutes, seconds);

  }, 1000);
}

function updateTimerView(hours, minutes, seconds) {
  hoursView.textContent = minTwoDigits(hours);
  minutesView.textContent = minTwoDigits(minutes);
  secondsView.textContent = minTwoDigits(seconds);
}

function parseNumber(text) {
  return Number(text);
}

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}

function toggleHideContainer() {
  if (containerDiv.classList.contains('hidden')) {
    containerDiv.classList.remove('hidden');
  } else {
    containerDiv.classList.add('hidden');
  }
}


function onStartTimer(e) {
  const hours = parseInt(hoursInput.value);
  const minutes = parseInt(minutesInput.value);
  const seconds = parseInt(secondsInput.value);

  if (hours === 0 && minutes === 0 && seconds === 0) {
    return;
  }

  startTimer(hours, minutes, seconds);

}

function pauseTimer() {
  paused = true;
  startTimerBtn.textContent = 'RESUME';
  toggleHideContainer();
  clearInterval(timer);
}

function incrementHours(e) {
  const value = parseInt(hoursInput.value);

  if (isNaN(value) || value === 99) {
    return
  }

  hoursInput.value = minTwoDigits(value + 1);
}

function incrementMinutes(e) {
  const value = parseInt(minutesInput.value);

  if (isNaN(value) || value === 59) {
    return
  }

  minutesInput.value = minTwoDigits(value + 1);
}


function incrementSeconds(e) {
  const value = parseInt(secondsInput.value);

  if (isNaN(value) || value === 59) {
    return
  }

  secondsInput.value = minTwoDigits(value + 1);
}

/* Decrement values */

function decrementHours(e) {
  const value = parseInt(hoursInput.value);

  if (isNaN(value) || value === 0) {
    return
  }

  hoursInput.value = minTwoDigits(value - 1);
}

function decrementMinutes(e) {
  const value = parseInt(minutesInput.value);

  if (isNaN(value) || value === 0) {
    return
  }

  minutesInput.value = minTwoDigits(value - 1);
}


function decrementSeconds(e) {
  const value = parseInt(secondsInput.value);

  if (isNaN(value) || value === 0) {
    return
  }

  secondsInput.value = minTwoDigits(value - 1);
}


/*  */

incrementHoursElement.addEventListener("click", incrementHours);
incrementMinutesElement.addEventListener("click", incrementMinutes);
incrementSecondsElement.addEventListener("click", incrementSeconds);

decrementHoursElement.addEventListener("click", decrementHours);
decrementMinutesElement.addEventListener("click", decrementMinutes);
decrementSecondsElement.addEventListener("click", decrementSeconds);

startTimerBtn.addEventListener("click", function (e) {
  if (e.target.textContent === 'PAUSE') {
    pauseTimer();
    return;
  } else {
    onStartTimer();
  }
});

function stopTimer(e) {
  totalSeconds = 0;
  clearInterval(timer);
  updateTimerView(0, 0, 0);
  startTimerBtn.textContent = 'START';
  containerDiv.classList.remove('hidden');
}

stopTimerBtn.addEventListener("click", stopTimer);
