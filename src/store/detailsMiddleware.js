import { updateDetailsArtwork } from './detailsSlice.js';

const detailsMiddleware = (store) => (next) => (action) => {
  if (action.type === 'RETURN_ARTWORK_DETAILS') {
    const id = action.id;

    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataDetails = updateDetailsArtwork(data);
        store.dispatch(dataDetails);
      });
  }

  next(action);
};

export default detailsMiddleware;
