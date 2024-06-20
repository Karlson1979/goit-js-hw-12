import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { gallery } from './js/render-functions';
import { getImg } from './js/pixabay-api';
import './css/loader.css';

const formEl = document.querySelector('.form');
const imgEl = document.querySelector('.nav-list');
const loaderEl = document.querySelector('.loader');

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const value = e.target.elements.search.value.trim();
  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  loaderEl.style.display = 'block';

  getImg(value)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.warning({
          title: 'No results',
          message: 'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      const markup = gallery(data.hits);
      imgEl.innerHTML = markup;
      let lightbox = new SimpleLightbox('.gallery a');
      lightbox.refresh();
      formEl.reset();
    })
    .catch(error => {
      console.error(error);
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      loaderEl.style.display = 'none'; 
    });
});
