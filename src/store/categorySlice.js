// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice des catégories
export const initialState = {
  list: [],
};

// Création du slice des catégories
const categorySlice = createSlice({
  name: 'category', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour mettre à jour les catégories
    updateCategory: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        list: action.payload, // Mise à jour de la liste des catégories avec les données reçues
      };
    },
  },
});

// Export des actions générées par createSlice
export const { updateCategory } = categorySlice.actions;

// Export du reducer généré par createSlice
export default categorySlice.reducer;