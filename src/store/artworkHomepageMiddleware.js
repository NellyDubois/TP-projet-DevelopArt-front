import { updateArtworkHomepage } from './artworkHomepageSlice';

// Middleware servant à récupérer les données des categories à partir de la base de données
const artworkHomepageMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_ARTWORK_HOMEPAGE') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres-homePage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const artworkHomepage = updateArtworkHomepage(data);
        
        store.dispatch(artworkHomepage);
      });
  }
  next(action);
};

export default artworkHomepageMiddleware;
