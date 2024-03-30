// Définition du middleware pour la mise à jour de catégorie
const categoryUpdateMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'UPDATE_CATEGORY'
  if (action.type === 'UPDATE_CATEGORY') {
    // Récupération de l'ID de la catégorie à mettre à jour depuis le store
    const id = store.getState().categoriesArtist.id
    // Si c'est le cas, on effectue une requête PATCH vers l'API pour mettre à jour la catégorie
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Utilisation du token de l'artiste pour l'autorisation
        Authorization: `Bearer ${store.getState().artist.token}`,
      },
      body: JSON.stringify({
        // Envoi des données de la catégorie à mettre à jour
        name: store.getState().categoriesArtist.name,
        description: store.getState().categoriesArtist.description,
        color : store.getState().categoriesArtist.color,
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Affichage des données reçues dans la console
        // console.log('le retour de PATCH est', data);
      });
  }
  // Si l'action dispatchée n'est pas de type 'UPDATE_CATEGORY', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware pour la mise à jour de catégorie
export default categoryUpdateMiddleware;