// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice de la nouvelle catégorie
export const initialState = {
  name: '', // Nom initialement vide pour la nouvelle catégorie
  color: '', // Couleur initialement vide pour la nouvelle catégorie
  description: '' // Description initialement vide pour la nouvelle catégorie
};

// Création du slice de la nouvelle catégorie
const newCategorySlice = createSlice({
  name: 'newCategory', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour mettre à jour le nom de la nouvelle catégorie
    newCategoryName: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        name: action.payload, // Mise à jour du nom avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour la couleur de la nouvelle catégorie
    newCategoryColor: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        color: action.payload, // Mise à jour de la couleur avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour la description de la nouvelle catégorie
    newCategoryDescription: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        description: action.payload, // Mise à jour de la description avec la donnée reçue
      };
    },
  },
});

// Export des actions générées par createSlice
export const { newCategoryName, newCategoryColor, newCategoryDescription } = newCategorySlice.actions;

// Export du reducer généré par createSlice
export default newCategorySlice.reducer;