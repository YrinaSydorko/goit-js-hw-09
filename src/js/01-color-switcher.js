const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
let isActive = false;
stopBtn.setAttribute('disabled', true);

startBtn.addEventListener('click', onChangeColor);
stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', true);
});

function onChangeColor() {
  timerId = setInterval(() => {
    const color = getRandomHexColor();
    document.body.style.backgroundColor = color;
  }, 1000);
  if (!isActive) {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
  }
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
