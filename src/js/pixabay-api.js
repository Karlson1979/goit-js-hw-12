import axios from 'axios';
import iziToast from 'izitoast';

export async function getImg(query, currentPage) {

  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const url = `${BASE_URL}${END_POINT}`;
  const options = {
    params: new URLSearchParams({
      key: '44403468-b3192a3f07a9f4ae6c998e95a',
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page:currentPage,
      per_page:15
    }),
  };
  try {
    const res = await axios.get(url, options);
    return res.data;
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    throw error;
  }
};
