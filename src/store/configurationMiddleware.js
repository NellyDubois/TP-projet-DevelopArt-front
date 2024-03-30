// Import des actions de mise à jour de la configuration
import {
  updateBackground,
  updateBackgroundNav,
  updateFont,
  updateColorFont,
  updateCursor,
  updateBanner,
  updateLogo,
} from './configurationSlice';

// Définition du middleware pour la configuration
const configurationMiddleware = (store) => (next) => (action) => {
  
  // Vérification si l'action dispatchée est de type 'GET_CONFIG_FROM_API'
  if (action.type === 'GET_CONFIG_FROM_API') {
    // Si c'est le cas, on effectue une requête GET vers l'API pour récupérer la configuration
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/configuration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // Conversion de la réponse en JSON
      .then((data) => {

        // Création des actions de mise à jour de la configuration avec les données reçues
        const dataCursor = updateCursor(process.env.REACT_APP_BASE_URL_BACK + data.cursor);
        const dataBanner = updateBanner(process.env.REACT_APP_BASE_URL_BACK + data.banner);
        const dataLogo = updateLogo(process.env.REACT_APP_BASE_URL_BACK + data.logo);
        const dataBackground = updateBackground(data.background_color);
        const dataBackgroundNav = updateBackgroundNav(data.background_color_nav);
        const dataFont = updateFont(data.font_type);
        const dataColorFont = updateColorFont(data.font_color);

        // Dispatch des actions de mise à jour de la configuration
        store.dispatch(dataBackground);
        store.dispatch(dataBackgroundNav);
        store.dispatch(dataFont);
        store.dispatch(dataColorFont);
        store.dispatch(dataCursor);
        store.dispatch(dataBanner);
        store.dispatch(dataLogo);
      });
  }
  // Si l'action dispatchée n'est pas de type 'GET_CONFIG_FROM_API', on passe simplement à l'action suivante
  next(action);
};

// Export du middleware pour la configuration
export default configurationMiddleware;