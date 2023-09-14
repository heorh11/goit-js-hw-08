import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');
const feedbackStorageKey = 'feedback-form-state';

// Відстежуємо подію input на формі та зберігаємо дані у локальне сховище зі затримкою
feedbackForm.addEventListener(
  'input',
  throttle(event => {
    const formData = {
      email: emailInput.value,
      message: messageTextarea.value,
    };
    localStorage.setItem(feedbackStorageKey, JSON.stringify(formData));
  }, 500)
);

// При завантаженні сторінки перевіряємо сховище та заповнюємо поля форми, якщо є збережені дані
window.addEventListener('load', () => {
  const storedData = localStorage.getItem(feedbackStorageKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
});

// Додаємо обробник події для сабміту форми
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();
  
  // Очищаємо сховище
  localStorage.removeItem(feedbackStorageKey);

  // Отримуємо дані з полів форми
  const emailValue = emailInput.value;
  const messageValue = messageTextarea.value;

  // Очищаємо поля форми
  emailInput.value = '';
  messageTextarea.value = '';

  // Виводимо у консоль об'єкт з полями email та message та їхніми значеннями
  console.log({
    email: emailValue,
    message: messageValue,
  });
});

