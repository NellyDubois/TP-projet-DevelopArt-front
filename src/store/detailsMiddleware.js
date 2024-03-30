// Import de l'action updateDetailsArtwork depuis le fichier detailsSlice.js
// Cette action est utilisée pour mettre à jour les détails d'une œuvre d'art dans le store Redux
import { updateDetailsArtwork } from './detailsSlice.js';

// Fonction detailsMiddleware = middleware Redux qui reçoit trois arguments : store, next, et action
// Elle renvoie une autre fonction qui sera appelée à chaque fois qu'une action est dispatchée dans le store
const detailsMiddleware = (store) => (next) => (action) => {
  // Vérifie si le type de l'action est RETURN_ARTWORK_DETAILS
  // Cela indique que l'application demande les détails d'une œuvre d'art spécifique
  if (action.type === 'RETURN_ARTWORK_DETAILS') {
    // Extrait l'identifiant de l'œuvre d'art à partir de l'action
    const id = action.id;

    // Requête GET vers l'API backend pour récupérer les détails de l'œuvre d'art avec l'identifiant spécifié
    // L'URL de l'API est construite à partir de la variable d'environnement REACT_APP_BASE_URL_BACK et de l'identifiant de l'œuvre d'art
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    // Une fois que la réponse de l'API est reçue, les données sont extraites au format JSON
    // Ensuite, la fonction updateDetailsArtwork est appelée avec ces données pour créer une action Redux qui met à jour les détails de l'œuvre d'art dans le store Redux
    // Enfin, cette action est dispatchée dans le store
      .then((response) => response.json())
      .then((data) => {
        const dataDetails = updateDetailsArtwork(data);
        store.dispatch(dataDetails);
      });
  }
  // Pour passer l'action au middleware suivant dans la chaîne de middleware Redux
  next(action);
};

// Export du middleware pour être utilisé dans l'application
export default detailsMiddleware;