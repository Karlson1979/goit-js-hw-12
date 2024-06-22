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
const loadBtnEl = document.querySelector('.loadbtn-js');

let currentPage = 1;
let value;
let lightbox;

formEl.addEventListener('submit', async e => {
  e.preventDefault();
  currentPage = 1;
  value = e.target.elements.search.value.trim();
  if (!value) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  loaderEl.style.display = 'block';

  try {
    const data = await getImg(value, currentPage);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      hideLoadBtn();
      return;
    }

    const markup = gallery(data.hits);
    imgEl.innerHTML = markup;
    showLoadBtn();
    if (!lightbox) {
      lightbox = new SimpleLightbox('.gallery a');
    } else {
      lightbox.refresh();
    }
    formEl.reset();
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loaderEl.style.display = 'none';
  }
});

function showLoadBtn() {
  loadBtnEl.classList.remove('hidden');
}

function hideLoadBtn() {
  loadBtnEl.classList.add('hidden');
}

loadBtnEl.addEventListener('click', async () => {
  currentPage++;

  loaderEl.style.display = 'block';

  try {
    const data = await getImg(value, currentPage);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No more results',
        message: 'Sorry, there are no more images matching your search query.',
        position: 'topRight',
      });
      hideLoadBtn();
      return;
    }

    const markup = gallery(data.hits);
    imgEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  } catch {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    loaderEl.style.display = 'none';
  }
});
