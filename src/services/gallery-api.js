function fetchImages(searchRequest, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchRequest}&page=${page}&key=22998776-fe1d89aff15cc96b76b12cb7b&image_type=photo&orientation=horizontal&per_page=12`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("Something went wrong"));
  });
}

const api = {
  fetchImages,
};

export default api;
