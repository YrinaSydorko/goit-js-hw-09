// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  datetimePickerEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysSpanEl: document.querySelector('span[data-days]'),
  hoursSpanEl: document.querySelector('span[data-hours]'),
  minutesSpanEl: document.querySelector('span[data-minutes]'),
  secondsSpanEl: document.querySelector('span[data-seconds]'),
};
let startTimeMs = 0;
refs.startBtnEl.setAttribute('disabled', '');
refs.secondsSpanEl.classList.remove('red');
const options = {
  intervalId: null,
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const startTime = selectedDates[0];

    if (startTime - options.defaultDate < 0) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    if (startTime > options.defaultDate) {
      refs.startBtnEl.removeAttribute('disabled', '');
      startTimeMs = startTime.getTime();
    }
  },
  onStartTimerBtnClick() {
    refs.startBtnEl.setAttribute('disabled', '');
    refs.datetimePickerEl.setAttribute('disabled', '');
    this.intervalId = setInterval(() => {
      const currentTimeMs = Date.now();
      const ms = startTimeMs - currentTimeMs;
      console.log(ms);

      const leftTime = convertMs(ms);
      updateTimerFace(leftTime);
      if (ms < 60000) {
        refs.secondsSpanEl.classList.add('red');
      }
      if (ms < 1000) {
        clearInterval(this.intervalId);
        return;
      }
    }, 1000);
  },
};

refs.startBtnEl.addEventListener('click', options.onStartTimerBtnClick);

const fp = flatpickr('#datetime-picker', options);

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.daysSpanEl.textContent = `${days}`;
  refs.hoursSpanEl.textContent = `${hours}`;
  refs.minutesSpanEl.textContent = `${minutes}`;
  refs.secondsSpanEl.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}



