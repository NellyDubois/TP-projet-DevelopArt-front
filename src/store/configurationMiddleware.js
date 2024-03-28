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
        const dataBanner = updateBanner(process.env.REACT_APP_BASE_URL_BACK + data.banner)
        const dataLogo = updateLogo(process.env.REACT_APP_BASE_URL_BACK + data.logo);
        const dataBackground = updateBackground(data.background_color);
        const dataBackgroundNav = updateBackgroundNav(data.background_color_nav);
        const dataFont = updateFont(data.font_type);
        const dataColorFont = updateColorFont(data.font_color);
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
