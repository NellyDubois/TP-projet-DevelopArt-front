// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice des détails
export const initialState = {
  list: [], // Liste initialement vide pour stocker les détails des œuvres d'art
};

// Création du slice des détails
const detailsSlice = createSlice({
  name: 'details', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour mettre à jour les détails d'une œuvre d'art
    updateDetailsArtwork: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        list: action.payload, // Mise à jour de la liste avec la donnée reçue
      };
    },
  },
});

// Export des actions générées par createSlice
export const { updateDetailsArtwork } = detailsSlice.actions;

// Export du reducer généré par createSlice
export default detailsSlice.reducer;