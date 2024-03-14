import { configureStore } from '@reduxjs/toolkit';
import artistSlice from './artistSlice';
import configurationSlice from './configurationSlice';
import artworkSlice from './artworkSlice';
import contactSlice from './contactSlice';
import detailsSlice from './detailsSlice';
import categorySlice from './categorySlice';

// import des middlewares :
import configurationMiddleware from './configurationMiddleware';
import authMiddleware from './authMiddleware';
import detailsMiddleware from './detailsMiddleware';
import configRegisterMiddleware from './configRegisterMiddleware';
import artistDataMiddleware from './artistDataMiddleware';
import artworkMiddleware from './artworkMiddleware';
import contactMiddleware from './contactMiddleware';
import artworkHomepageSlice from './artworkHomepageSlice';
import artworkHomepageMiddleware from './artworkHomepageMiddleware';
import artworkHomepageUpdateMiddleware from './artworkHomepageUpdateMiddleware';

import artworkByCategoryMiddleware from './artworkByCategoryMiddleware';
import categoryMiddleware from './categoryMiddleware';
import newCategoryMiddleware from './newCategoryMiddleware';
import newCategorySlice from './newCategorySlice';
import categoriesArtistMiddleware from './categoriesArtistMiddleware';
import categoriesArtistSlice from './categoriesArtistSlice';
import categoryUpdateMiddleware from './categoryUpdateMiddleware';
import categoryDeleteMiddleware from './categoryDeleteMiddleware';
import artworkDeleteMiddleware from './artworkDeleteMiddleware';

const store = configureStore({
  reducer: {
    artist: artistSlice,
    configuration: configurationSlice,
    artwork: artworkSlice,
    contact: contactSlice,
    artworkHomepage: artworkHomepageSlice,
    details: detailsSlice,

    category: categorySlice,

    newCategory: newCategorySlice,
    categoriesArtist: categoriesArtistSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      configurationMiddleware,
      authMiddleware,
      configRegisterMiddleware,
      artistDataMiddleware,
      artworkMiddleware,
      contactMiddleware,
      artworkHomepageMiddleware,
      detailsMiddleware,
      artworkHomepageUpdateMiddleware,
      artworkByCategoryMiddleware,
      categoryMiddleware,
      newCategoryMiddleware,
      categoriesArtistMiddleware,
      categoryUpdateMiddleware,
      categoryDeleteMiddleware,
      artworkDeleteMiddleware
    ),
});

export default store;
