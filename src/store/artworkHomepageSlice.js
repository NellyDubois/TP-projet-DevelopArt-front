// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice des œuvres d'art de la page d'accueil
export const initialState = {
  name: '', // Nom de l'œuvre d'art
  id: '', // ID de l'œuvre d'art
  description: '', // Description de l'œuvre d'art
  framing: '', // Encadrement de l'œuvre d'art
  width: '', // Largeur de l'œuvre d'art
  height: '', // Hauteur de l'œuvre d'art
  media: '', // Média de l'œuvre d'art
  orientation: '', // Orientation de l'œuvre d'art
  productionYear: '', // Année de production de l'œuvre d'art
  quote: '', // Citation de l'œuvre d'art
  technique: '', // Technique de l'œuvre d'art
  categoryNames: [], // Noms des catégories de l'œuvre d'art
  list: [], // Liste des œuvres d'art
};

// Création du slice des œuvres d'art de la page d'accueil avec Redux Toolkit
const artworkHomepageSlice = createSlice({
  name: 'artworkHomepage', // Nom du slice
  initialState, // État initial du slice
  reducers: { // Les reducers pour gérer les actions sur l'état du slice
    // Reducer pour mettre à jour la liste des œuvres d'art de la page d'accueil
    updateArtworkHomepage: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        list: [...action.payload], // Mise à jour de la liste des œuvres d'art
      };
    },
    // Reducer pour mettre à jour l'ID de l'œuvre d'art
    updateId: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        id: action.payload, // Mise à jour de l'ID
      };
    },
    // Reducer pour mettre à jour le nom de l'œuvre d'art
    updateName: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        name: action.payload, // Mise à jour du nom
      };
    },
    // Reducer pour mettre à jour la description de l'œuvre d'art
    updateDescription: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        description: action.payload, // Mise à jour de la description
      };
    },
    // Reducer pour mettre à jour la citation de l'œuvre d'art
    updateQuote: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        quote: action.payload, // Mise à jour de la citation
      };
    },
    // Reducer pour mettre à jour la largeur de l'œuvre d'art
    updateWidth: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        width: action.payload, // Mise à jour de la largeur
      };
    },
    // Reducer pour mettre à jour la hauteur de l'œuvre d'art
    updateHeight: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        height: action.payload, // Mise à jour de la hauteur
      };
    },
    // Reducer pour mettre à jour la technique de l'œuvre d'art
    updateTechnique: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        technique: action.payload, // Mise à jour de la technique
      };
    },
    // Reducer pour mettre à jour l'orientation de l'œuvre d'art
    updateOrientation: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        orientation: action.payload, // Mise à jour de l'orientation
      };
    },
    // Reducer pour mettre à jour le média de l'œuvre d'art
    updateMedia: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        media: action.payload, // Mise à jour du média
      };
    },
    // Reducer pour mettre à jour l'encadrement de l'œuvre d'art
    updateFraming: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        framing: action.payload, // Mise à jour de l'encadrement
      };
    },
    // Reducer pour mettre à jour l'année de production de l'œuvre d'art
    updateProductionYear: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        productionYear: action.payload, // Mise à jour de l'année de production
      };
    },
    // Reducer pour mettre à jour les catégories de l'œuvre d'art
    updateCategories: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        categoryNames: [...action.payload] // Mise à jour des noms des catégories
      }
    }
  },
});

// Export des actions du slice des œuvres d'art de la page d'accueil
export const {
  updateArtworkHomepage,
  updateId,
  updateDescription,
  updateName,
  updateFraming,
  updateHeight,
  updateWidth,
  updateMedia,
  updateProductionYear,
  updateTechnique,
  updateOrientation,
  updateQuote,
  updateCategories
} = artworkHomepageSlice.actions;

// Export du reducer du slice des œuvres d'art de la page d'accueil
export default artworkHomepageSlice.reducer;