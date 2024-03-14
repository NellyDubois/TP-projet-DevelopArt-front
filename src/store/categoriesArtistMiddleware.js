import { getCategoriesArtist } from "./categoriesArtistSlice";

const categoriesArtistMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_CATEGORIES_ARTIST') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const categoriesArtist = getCategoriesArtist(data);
        store.dispatch(categoriesArtist);
      });
  }
  next(action);
};

export default categoriesArtistMiddleware;
