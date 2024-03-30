// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice de la configuration
export const initialState = {
  id: 1,
  font_type: 'Big Shoulders Stencil Display',
  background_color: 'black',
  background_color_nav: 'black',
  cursor: 'Arrow',
  font_color: 'white',
  layout: '1',
  facebook_flag: true,
  insta_flag: true,
  twitter_flag: true,
  youtube_flag: true,
  artist_id: 1,
  banner: 'https://picsum.photos/id/57/2448/3264',
  logo: `${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-photo.png`,
  loading: true,
  cursor_path: '',
};

// Création du slice de la configuration
const configurationSlice = createSlice({
  name: 'configuration', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour mettre à jour le type de police
    updateFont: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        font_type: action.payload, // Mise à jour du type de police avec la donnée reçue
        loading: false, // Mise à jour de l'état de chargement
      };
    },
    // Reducer pour mettre à jour la couleur de fond
    updateBackground: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        background_color: action.payload, // Mise à jour de la couleur de fond avec la donnée reçue
        loading: false, // Mise à jour de l'état de chargement
      };
    },
    // Reducer pour mettre à jour la couleur de fond de la navigation
    updateBackgroundNav: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        background_color_nav: action.payload, // Mise à jour de la couleur de fond de la navigation avec la donnée reçue
        loading: false, // Mise à jour de l'état de chargement
      };
    },
    // Reducer pour mettre à jour la couleur de la police
    updateColorFont: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        font_color: action.payload, // Mise à jour de la couleur de la police avec la donnée reçue
        loading: false, // Mise à jour de l'état de chargement
      };
    },
    // Reducer pour mettre à jour le curseur
    updateCursor: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        cursor: `url(${action.payload}), auto`, // Mise à jour du curseur avec la donnée reçue
        cursor_path: action.payload, // Mise à jour du chemin du curseur avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour la bannière
    updateBanner: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        banner: action.payload, // Mise à jour de la bannière avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour le logo
    updateLogo: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        logo: action.payload, // Mise à jour du logo avec la donnée reçue
      };
    }
  },
});

// Export des actions générées par createSlice
export const { updateFont, updateBackground, updateBackgroundNav, updateColorFont, updateCursor, updateBanner, updateLogo } =
  configurationSlice.actions;

// Export du reducer généré par createSlice
export default configurationSlice.reducer;