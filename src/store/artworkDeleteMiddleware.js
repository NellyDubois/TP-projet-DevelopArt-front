// Définition du middleware artworkDeleteMiddleware
const artworkDeleteMiddleware = (store) => (next) => (action) => {
  // Vérifie si l'action reçue est de type 'DELETE_ARTWORK'
  if (action.type === 'DELETE_ARTWORK') {
    // Récupère l'ID de l'œuvre d'art à supprimer depuis le store Redux
    const id = store.getState().artwork.deleteId;

    // Effectue une requête DELETE vers l'API backend pour supprimer l'œuvre d'art correspondante
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Ajoute le jeton d'authentification JWT dans les en-têtes de la requête pour s'assurer que l'artiste est autorisé à supprimer l'œuvre d'art
        Authorization: `Bearer ${store.getState().artist.token}`,
      },
    })
      // Une fois que la réponse est reçue, la transforme en format JSON en appelant la méthode response.json()
      .then((response) => response.json())
      .then((data) => {
         // Affiche dans la console le retour de la requête DELETE
        // console.log('le retour de DELETE est', data);
      });
  }
  // Passe l'action au middleware ou au reducer suivant dans la chaîne
  next(action);
};

// Exporte le middleware artworkDeleteMiddleware
export default artworkDeleteMiddleware;
