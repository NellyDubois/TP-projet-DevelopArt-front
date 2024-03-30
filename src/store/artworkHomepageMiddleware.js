// Import de l'action updateArtworkHomepage depuis le fichier artworkHomepageSlice
import { updateArtworkHomepage } from './artworkHomepageSlice';

// Définition du middleware artworkHomepageMiddleware
// Un middleware est une fonction qui peut intercepter les actions dispatchées avant qu'elles n'atteignent le reducer
const artworkHomepageMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'GET_ARTWORK_HOMEPAGE'
  if (action.type === 'GET_ARTWORK_HOMEPAGE') {
    // Si c'est le cas, on effectue une requête GET vers l'API pour récupérer les œuvres d'art de la page d'accueil
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres-homePage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Création de l'action updateArtworkHomepage avec les données récupérées
        const artworkHomepage = updateArtworkHomepage(data);
        // Dispatch de l'action updateArtworkHomepage pour mettre à jour le store
        store.dispatch(artworkHomepage);
      });
  }
  // Si l'action dispatchée n'est pas de type 'GET_ARTWORK_HOMEPAGE', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware
export default artworkHomepageMiddleware;