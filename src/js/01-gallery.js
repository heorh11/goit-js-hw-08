// Описаний в документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');

const galleryMarkup = galleryItems.map(item => `
  <li class='gallery__item'>
    <a class='gallery__link' href='${item.original}'>
      <img class='gallery__image' src='${item.preview}' alt='${item.description}' data-source='${item.original}'>
    </a>
  </li>
`).join('');

galleryContainer.innerHTML = galleryMarkup;


const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
galleryContainer.addEventListener('click', evt => {
  const clickedElement = evt.target;

  // Check if the clicked element is an image
  if (clickedElement.tagName === 'IMG') {
    evt.preventDefault();
    const largeImgSrc = clickedElement.getAttribute('data-source');
    // Відкриваємо велике зображення в спливаючому вікні
    lightbox.open({ items: [largeImgSrc] });
  }
});

console.log(galleryItems);
