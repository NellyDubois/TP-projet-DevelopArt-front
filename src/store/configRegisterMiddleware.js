import { useSelector, useDispatch } from 'react-redux';

const configRegisterMiddleware = (store) => (next) => (action) => {
  if (action.type === 'CONFIG_REGISTER') {
    const state = store.getState();
    const baseUrl = process.env.REACT_APP_BASE_URL_BACK;

    const cursorPath = state.configuration.cursor_path.replace(baseUrl, '');
    const bannerPath = state.configuration.banner.replace(baseUrl, '');
    const logoPath = state.configuration.logo.replace(baseUrl, '');

    console.log('Cursor path:', cursorPath); // Affiche le chemin du curseur

    fetch(`${baseUrl}/1/configuration`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${state.artist.token}`,
      },
      body: JSON.stringify({
        font_type: state.configuration.font_type,
        background_color: state.configuration.background_color,
        background_color_nav: state.configuration.background_color_nav,
        font_color: state.configuration.font_color,
        cursor: cursorPath,
        banner: bannerPath,
        logo: logoPath
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('le retour de PATCH est', data);

        // const dataConfig = updateBackground(data);

        // store.dispatch(dataConfig);
      });

    // next(action);
  }

  next(action);
};

export default configRegisterMiddleware;
