// configuration du store Redux: définition des reducers, des middlewares et la création du store lui-même
//Import de la fonction configureStore de Redux Toolkit
import { configureStore } from '@reduxjs/toolkit';

// Import des slices (portion de l'état global dans Redux, définie par un ensemble de reducers et d'actions, qui permet de gérer de manière isolée une partie spécifique de l'application)
import artistSlice from './artistSlice';
import configurationSlice from './configurationSlice';
import artworkSlice from './artworkSlice';
import contactSlice from './contactSlice';
import detailsSlice from './detailsSlice';
import categorySlice from './categorySlice';

// Import des middlewares (fonction intermédiaire entre l'action envoyée et le reducer dans Redux, permettant de gérer des actions asynchrones, d'effectuer des traitements avant que l'action n'atteigne le reducer, ou de modifier l'action en cours de route) :
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

// Création et configuration du store Redux
const store = configureStore({
  // Définition des reducers (fonction pure dans Redux qui spécifie comment l'état de l'application change en réponse à une action envoyée au store). Chaque reducer correspond à un slice spécifique (artiste, configuration, œuvre d'art, ...) de l'état global de l'application
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
  //Définition des middlewares (fonctions qui interceptent et traitent les actions avant qu'elles n'atteignent les reducers). Ici, plusieurs middlewares sont définis pour gérer différentes fonctionnalités de l'application, telles que la gestion de la configuration, l'authentification, la récupération des données des artistes, des œuvres d'art, des catégories, etc.
  //Les middlewares sont concaténés avec les middlewares par défaut de Redux à l'aide de la fonction getDefaultMiddleware().concat(...middlewares pour conserver les fonctionnalités de middlewares par défaut de Redux).
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

// Export du store pour être utilisé dans le reste de l'application
export default store;
