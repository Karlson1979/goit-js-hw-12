export function getImg(query) {
  const BASE_URL = 'https://pixabay.com';
  const END_POINT = '/api/';
  const params = new URLSearchParams({
    key: '44403468-b3192a3f07a9f4ae6c998e95a',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;

  return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (!data.hits.length) {
        throw new Error('No images found');
      }
      return data;
    });
}