// Import de l'action à dispatcher pour récupérer les catégories de l'artiste
import { getCategoriesArtist } from "./categoriesArtistSlice";

// Définition du middleware pour les catégories de l'artiste
const categoriesArtistMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'GET_CATEGORIES_ARTIST'
  if (action.type === 'GET_CATEGORIES_ARTIST') {
    // Si c'est le cas, on effectue une requête GET vers l'API pour récupérer les catégories de l'artiste
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Création de l'action pour récupérer les catégories de l'artiste avec les données reçues
        const categoriesArtist = getCategoriesArtist(data);
        // Dispatch de l'action pour récupérer les catégories de l'artiste
        store.dispatch(categoriesArtist);
      });
  }
  // Si l'action dispatchée n'est pas de type 'GET_CATEGORIES_ARTIST', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware pour les catégories de l'artiste
export default categoriesArtistMiddleware;