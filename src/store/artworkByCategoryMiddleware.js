// Import de l'action updateArtworkList depuis le slice artworkSlice.js, qui contient les actions et le reducer associés aux œuvres d'art dans le store Redux.
import { updateArtworkList } from './artworkSlice';

// Définition d'un middleware Redux appelé artworkByCategoryMiddleware qui est responsable de récupérer les données des œuvres d'art par catégorie à partir de l'API backend et de les mettre à jour dans le Redux store en utilisant l'action updateArtworkList définie dans le slice artworkSlice.
const artworkByCategoryMiddleware = (store) => (next) => (action) => {
  // Vérifie si l'action reçue est de type 'ARTWORK_BY_CATEGORY'. Cela signifie que ce middleware est conçu pour être déclenché lorsque le composant souhaite récupérer des œuvres d'art en fonction d'une catégorie spécifique.
  if (action.type === 'ARTWORK_BY_CATEGORY') {
    // Effectue une requête GET vers l'API backend pour récupérer les œuvres d'art par catégorie
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // Une fois que la réponse est reçue, on la transforme en format JSON en appelant la méthode response.json().
      .then((response) => response.json())
      // Une fois les données obtenues, on les met à jour dans le store Redux en utilisant une action
      .then((data) => {    
        const action = updateArtworkList(data);
        // Dispatche l'action pour effectuer la mise à jour dans le store Redux
        store.dispatch(action);
      });
  }
  // Passe l'action au middleware ou au reducer suivant dans la chaîne
  next(action);
};

export default artworkByCategoryMiddleware;
