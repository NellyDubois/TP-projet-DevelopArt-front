import {
  // updateArtworkName,
  // updateArtworkDescription,
  // updateArtworkYear,
  // updateArtworkTechnique,
  // updateArtworkHeight,
  // updateArtworkMedia,
  // updateArtworkFraming,
  // updateArtworkPath,
  // updateArtworkOrientation,
  // updateArtworkPosition,
  // updateArtworkHomepageFlag,
  updateArtworkList,
} from './artworkSlice';

const artworkMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ARTWORK_GALLERY') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/oeuvres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const artData = updateArtworkList(data);
        store.dispatch(artData);

        // for (const elem of data) {
        //   // console.log(elem);
        //   const name = updateArtworkName(elem.name);
        //   store.dispatch(name);
        //   // console.log(elem.name);

        //   const description = updateArtworkDescription(elem.description);
        //   store.dispatch(description);

        //   const productionYear = updateArtworkYear(elem.production_year);
        //   store.dispatch(productionYear);

        //   const technique = updateArtworkTechnique(elem.technique);
        //   store.dispatch(technique);

        //   const height = updateArtworkHeight(elem.height);
        //   store.dispatch(height);

        //   const media = updateArtworkMedia(elem.media);
        //   store.dispatch(media);

        //   const framing = updateArtworkFraming(elem.framing);
        //   store.dispatch(framing);

        //   const path = updateArtworkPath(elem.path);
        //   store.dispatch(path);

        //   const orientation = updateArtworkOrientation(elem.orientation);
        //   store.dispatch(orientation);

        //   const position = updateArtworkPosition(elem.position);
        //   store.dispatch(position);

        //   const flag = updateArtworkHomepageFlag(elem.homepage_flag);
        //   store.dispatch(flag);
        // }
      });
  }
  next(action);
};

export default artworkMiddleware;
