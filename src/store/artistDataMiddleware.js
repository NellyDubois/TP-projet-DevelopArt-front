import { getDataArtist } from "./artistSlice";

// Middleware servant à récupérer les données de l'artiste à partir de la base de données
const artistDataMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_DATA_ARTIST') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataArtist = getDataArtist(data);
        store.dispatch(dataArtist);
      });
  }
  next(action);
};

export default artistDataMiddleware;
