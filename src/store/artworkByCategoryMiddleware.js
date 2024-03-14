// import { updateArtworkByCategory } from './artworkByCategorySlice';
import { updateArtworkList } from './artworkSlice';

const artworkByCategoryMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ARTWORK_BY_CATEGORY') {
    // const categories_id = action.id;
    // fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/${categories_id}`,
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('retour de la route 3000/1/oeuvres', data);

        const action = updateArtworkList(data);
        store.dispatch(action);
      });
  }
  next(action);
};

export default artworkByCategoryMiddleware;
