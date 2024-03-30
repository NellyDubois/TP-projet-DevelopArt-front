// Import des hooks useSelector et useDispatch de Redux, mais ils ne sont pas utilisés dans ce middleware
import { useSelector, useDispatch } from 'react-redux';

// Définition du middleware pour la configuration de l'enregistrement
const configRegisterMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'CONFIG_REGISTER'
  if (action.type === 'CONFIG_REGISTER') {
    // Récupération de l'état actuel du store
    const state = store.getState();
    // Récupération de l'URL de base depuis les variables d'environnement
    const baseUrl = process.env.REACT_APP_BASE_URL_BACK;

    // Suppression de l'URL de base des chemins des fichiers pour ne garder que les chemins relatifs
    const cursorPath = state.configuration.cursor_path.replace(baseUrl, '');
    const bannerPath = state.configuration.banner.replace(baseUrl, '');
    const logoPath = state.configuration.logo.replace(baseUrl, '');

    // Envoi d'une requête PATCH à l'API pour mettre à jour la configuration
    fetch(`${baseUrl}/1/configuration`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Utilisation du token de l'artiste pour l'autorisation
        Authorization: `Bearer ${state.artist.token}`,
      },
      body: JSON.stringify({
        // Envoi des données de configuration à mettre à jour
        font_type: state.configuration.font_type,
        background_color: state.configuration.background_color,
        background_color_nav: state.configuration.background_color_nav,
        font_color: state.configuration.font_color,
        cursor: cursorPath,
        banner: bannerPath,
        logo: logoPath
      }),
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {
        // Affichage des données reçues dans la console
        console.log('le retour de PATCH est', data);       
      });
  }

  // Si l'action dispatchée n'est pas de type 'CONFIG_REGISTER', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware pour la configuration de l'enregistrement
export default configRegisterMiddleware;