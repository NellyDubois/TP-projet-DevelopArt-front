import {
  updateBackground,
  updateBackgroundNav,
  updateFont,
  updateColorFont,
  updateCursor,
  updateBanner,
  updateLogo,
} from './configurationSlice';

const configurationMiddleware = (store) => (next) => (action) => {
  if (action.type === 'GET_CONFIG_FROM_API') {
    // console.log('ici on déclenche le middleware GET');
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/configuration`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const dataCursor = updateCursor(process.env.REACT_APP_BASE_URL_BACK +data.cursor);
        console.log(dataCursor);
        const dataBanner = updateBanner(process.env.REACT_APP_BASE_URL_BACK + data.banner)
        const dataLogo = updateLogo(process.env.REACT_APP_BASE_URL_BACK + data.logo);
        const dataBackground = updateBackground(data.background_color);
        const dataBackgroundNav = updateBackgroundNav(data.background_color_nav);
        console.log(
           "ici c'est ce qu'on recupère suite a l'appel GET pour dataBackground",
          dataBackgroundNav
         );
        const dataFont = updateFont(data.font_type);
        // console.log(
        //   "ici c'est ce qu'on recupère suite a l'appel GET pour font_type",
        //   dataFont
        // );

        const dataColorFont = updateColorFont(data.font_color);
        // console.log(
        //   "ici c'est ce qu'on recupère suite a l'appel GET pour font_color",
        //   dataColorFont
        // );
        store.dispatch(dataBackground);
        store.dispatch(dataBackgroundNav);
        store.dispatch(dataFont);
        store.dispatch(dataColorFont);
        store.dispatch(dataCursor);
        store.dispatch(dataBanner);
        store.dispatch(dataLogo);
      });
  }

  next(action);
};

export default configurationMiddleware;
