// La fonction categoryDeleteMiddleware est un middleware Redux qui utilise la curryfication.
// Elle prend en premier argument le 'store' Redux, puis renvoie une fonction qui prend en argument la fonction 'next' (qui permet de passer à l'action ou au middleware suivant).
// Cette fonction renvoie ensuite une autre fonction qui prend en argument l'action dispatchée.
const categoryDeleteMiddleware = (store) => (next) => (action) => {

  // Vérification si l'action dispatchée est de type 'DELETE_CATEGORY'
  if (action.type === 'DELETE_CATEGORY') {

    // Récupération de l'ID de la catégorie à supprimer depuis le store
    const id = store.getState().categoriesArtist.deleteId

    // Si c'est le cas, on effectue une requête DELETE vers l'API pour supprimer la catégorie
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // Utilisation du token de l'artiste pour l'autorisation
        Authorization: `Bearer ${store.getState().artist.token}`,
      }
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Affichage des données reçues dans la console
        // console.log('le retour de DELETE est', data);
      });
  }
  // Si l'action dispatchée n'est pas de type 'DELETE_CATEGORY', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware pour la suppression de catégorie
export default categoryDeleteMiddleware;