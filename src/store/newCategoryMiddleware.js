// Middleware Redux pour la création d'une nouvelle catégorie
const newCategoryMiddleware = (store) => (next) => (action) => {
  // Vérifie si le type de l'action est NEW_CATEGORY
  // Cela indique que l'application demande la création d'une nouvelle catégorie
  if (action.type === 'NEW_CATEGORY') {
    // Envoi d'une requête POST à l'API pour créer une nouvelle catégorie
    // L'URL de l'API est construite à partir de la variable d'environnement REACT_APP_BASE_URL_BACK
    // Le corps de la requête est un objet JSON contenant le nom, la description et la couleur de la nouvelle catégorie
    // Le token de l'artiste est ajouté à l'en-tête de la requête pour l'autorisation
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().artist.token}`,
      },
      body: JSON.stringify({
        name: store.getState().newCategory.name,
        description: store.getState().newCategory.description,
        color : store.getState().newCategory.color,
      }),
    })
    // Une fois que la réponse de l'API est reçue, les données sont extraites au format JSON
    // Ensuite, les données sont affichées dans la console
      .then((response) => response.json())
      .then((data) => {
        console.log('le retour de POST est', data);
      });
  }
  // Pour passer l'action au middleware suivant dans la chaîne de middleware Redux
  next(action);
};

// Export du middleware pour être utilisé dans l'application
export default newCategoryMiddleware;