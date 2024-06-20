
export function gallery(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
        <a href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
          <li class="item">
            <img src="${webformatURL}" alt="${tags}" width="360" height="170">
            <div class="statistic">
              <p>Likes:<br> <span>${likes}</span></p>
              <p>Views:<br> <span>${views}</span></p>
              <p>Comments:<br> <span>${comments}</span></p>
              <p>Downloads:<br> <span>${downloads}</span></p>
            </div>
          </li>
        </a>
      `
    )
    .join('');
}
