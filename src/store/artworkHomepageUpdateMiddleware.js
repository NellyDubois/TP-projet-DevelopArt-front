// Définition du middleware artworkHomepageUpdateMiddleware
// Un middleware est une fonction qui peut intercepter les actions dispatchées avant qu'elles n'atteignent le reducer
const artworkHomepageUpdateMiddleware = (store) => (next) => (action) => {

  // Vérification si l'action dispatchée est de type 'UPDATE_ARTWORK_HOMEPAGE'
  if (action.type === 'UPDATE_ARTWORK_HOMEPAGE') {
    
    // Récupération de l'ID et des noms de catégories de l'œuvre d'art de la page d'accueil depuis le store
    const id = store.getState().artworkHomepage.id;
    const categoryNames = store.getState().artworkHomepage.categoryNames; 
    
    // Si c'est le cas, on effectue une requête PATCH vers l'API pour mettre à jour l'œuvre d'art de la page d'accueil
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().artist.token}`, // Utilisation du token de l'artiste pour l'autorisation
      },
      body: JSON.stringify({
        // Envoi des données de l'œuvre d'art de la page d'accueil à mettre à jour
        name: store.getState().artworkHomepage.name,
        description: store.getState().artworkHomepage.description,
        production_year: store.getState().artworkHomepage.productionYear,
        technique: store.getState().artworkHomepage.technique,
        width: store.getState().artworkHomepage.width,
        height: store.getState().artworkHomepage.height,
        media: store.getState().artworkHomepage.media,
        framing: store.getState().artworkHomepage.framing,
        quote: store.getState().artworkHomepage.quote,
        orientation: store.getState().artworkHomepage.orientation,
        categories: store.getState().artworkHomepage.categoryNames.join(',')
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Traitement des données reçues (ici, simplement affichées dans la console)
        // console.log("le retour du PATCH de l'oeuvre est", data);
      });
  }

  // Si l'action dispatchée n'est pas de type 'UPDATE_ARTWORK_HOMEPAGE', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware
export default artworkHomepageUpdateMiddleware;