import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player'); // 'vimeo-player' - це ID вашого <iframe>

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Встановлюємо обробник події timeupdate для відстежування часу відтворення
vimeoPlayer.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));

// Функція для зберігання часу відтворення в локальному сховищі
function saveTimeToLocalStorage(event) {
  const currentTime = event.seconds.toFixed(2);
  localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);
}

// Отримуємо збережений час відтворення з локального сховища та встановлюємо час відтворення
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);
if (savedTime !== null) {
  vimeoPlayer.setCurrentTime(parseFloat(savedTime));
}

