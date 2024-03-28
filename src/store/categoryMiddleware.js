// Import de l'action updateCategory depuis le fichier categorySlice
import { updateCategory } from './categorySlice';

// Définition du middleware categoryMiddleware
const categoryMiddleware = (store) => (next) => (action) => {
  // Vérifie si l'action reçue est de type 'ALL_CATEGORY'
  if (action.type === 'ALL_CATEGORY') {
    // Effectue une requête GET vers l'API backend pour récupérer toutes les catégories disponibles
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      // Une fois que la réponse est reçue, la transforme en format JSON en appelant la méthode response.json()
      .then((response) => response.json())
      // Une fois les données obtenues, les met à jour dans le store Redux en utilisant une action
      .then((data) => {
        // Crée une action pour mettre à jour la liste des catégories dans le store Redux
        const action = updateCategory(data);
        // Dispatche l'action pour effectuer la mise à jour dans le store Redux
        store.dispatch(action);
      });
  }
  // Passe l'action au middleware ou au reducer suivant dans la chaîne
  next(action);
};

// Exporte le middleware categoryMiddleware
export default categoryMiddleware;