// Import de l'action getDataArtist depuis le fichier artistSlice
import { getDataArtist } from "./artistSlice";

// Définition du middleware artistDataMiddleware
// Un middleware est une fonction qui peut intercepter les actions dispatchées avant qu'elles n'atteignent le reducer
const artistDataMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'GET_DATA_ARTIST'
  if (action.type === 'GET_DATA_ARTIST') {
    // Si c'est le cas, on effectue une requête GET vers l'API pour récupérer les données de l'artiste
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Création de l'action getDataArtist avec les données récupérées
        const dataArtist = getDataArtist(data);
        // Dispatch de l'action getDataArtist pour mettre à jour le store
        store.dispatch(dataArtist);
      });
  }
  // Si l'action dispatchée n'est pas de type 'GET_DATA_ARTIST', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware
export default artistDataMiddleware;