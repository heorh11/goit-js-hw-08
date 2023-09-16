import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const vimeoPlayer = new Player('vimeo-player'); // 'vimeo-player' - це ID вашого <iframe>

const LOCAL_STORAGE_KEY = 'videoplayer-current-time';

// Отримуємо збережений час відтворення з локального сховища
const savedTime = localStorage.getItem(LOCAL_STORAGE_KEY);

// Відтворюємо відео та встановлюємо час відтворення
vimeoPlayer.play().then(() => {
  if (savedTime) {
    vimeoPlayer.setCurrentTime(parseFloat(savedTime));
  }

  // Встановлюємо обробник події timeupdate для відстежування часу відтворення
  vimeoPlayer.on('timeupdate', throttle(saveTimeToLocalStorage, 1000));
});

// Функція для зберігання часу відтворення в локальному сховищі
function saveTimeToLocalStorage(event) {
  const currentTime = event.seconds.toFixed(2);
  localStorage.setItem(LOCAL_STORAGE_KEY, currentTime);
}

