// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const startBtn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let timerId = null;

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    startBtn.setAttribute('disabled', true);

    if (+selectedDates[0] < +Date.now()) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
    }
  },
});

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', true);
  input.setAttribute('disabled', true);
  const endTime = Date.parse(input.value);
  timerId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = endTime - currentTime;
    const time = convertMs(deltaTime);
    if (deltaTime <= 0) {
      clearInterval(timerId);
      Notify.success('The time is up!');
    } else {
      updateTimer(time);
    }
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const daysMS = addLeadingZero(Math.floor(ms / day));
  const hoursMS = addLeadingZero(Math.floor((ms % day) / hour));
  const minutesMS = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const secondsMS = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { daysMS, hoursMS, minutesMS, secondsMS };
}

function updateTimer({ daysMS, hoursMS, minutesMS, secondsMS }) {
  days.textContent = daysMS;
  hours.textContent = hoursMS;
  minutes.textContent = minutesMS;
  seconds.textContent = secondsMS;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}



