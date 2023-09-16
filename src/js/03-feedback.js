import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageTextarea = feedbackForm.querySelector('textarea[name="message"]');
const feedbackStorageKey = 'feedback-form-state';

// Track input changes on the form and save data to local storage with throttling
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

// Check local storage on page load and populate form fields with saved data if available
window.addEventListener('load', () => {
  const storedData = localStorage.getItem(feedbackStorageKey);
  if (storedData) {
    const formData = JSON.parse(storedData);
    emailInput.value = formData.email;
    messageTextarea.value = formData.message;
  }
});

// Add an event handler for form submission
feedbackForm.addEventListener('submit', event => {
  event.preventDefault();

  // Get data from form fields
  const emailValue = emailInput.value;
  const messageValue = messageTextarea.value;

  // Check if either input field is empty
  if (emailValue.trim() === '' || messageValue.trim() === '') {
    // Show an alert if either field is empty
    alert('Both email and message fields must be filled.');
  } else {
    // Clear local storage
    localStorage.removeItem(feedbackStorageKey);

    // Clear form fields
    emailInput.value = '';
    messageTextarea.value = '';

    // Log an object with email and message fields and their values
    console.log({
      email: emailValue,
      message: messageValue,
    });
  }
});
