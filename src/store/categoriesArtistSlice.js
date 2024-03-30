// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice des catégories de l'artiste
export const initialState = {
  id: '',
  name: '',
  description: '',
  color: '',
  deleteId: '',
  list: [],
};

// Création du slice des catégories de l'artiste
const categoriesArtistSlice = createSlice({
  name: 'categoriesArtist', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour récupérer les catégories de l'artiste
    getCategoriesArtist: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        list: [...action.payload] // Mise à jour de la liste des catégories avec les données reçues
      };
    },
    // Reducer pour mettre à jour le nom de la catégorie
    updateCategoryName: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        name: action.payload, // Mise à jour du nom avec la donnée reçue
      }
    },
    // Reducer pour mettre à jour la couleur de la catégorie
    updateCategoryColor: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        color: action.payload // Mise à jour de la couleur avec la donnée reçue
      }
    },
    // Reducer pour mettre à jour la description de la catégorie
    updateCategoryDescription: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        description: action.payload // Mise à jour de la description avec la donnée reçue
      }
    },
    // Reducer pour mettre à jour l'ID de la catégorie courante
    updateCategoryCurrentId: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        id: action.payload // Mise à jour de l'ID avec la donnée reçue
      }
    },
    // Reducer pour mettre à jour l'ID de la catégorie à supprimer
    updateDeleteId: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        deleteId: action.payload // Mise à jour de l'ID de suppression avec la donnée reçue
      }
    },
  }
});

// Export des actions générées par createSlice
export const { getCategoriesArtist, updateCategoryColor, updateCategoryDescription, updateCategoryCurrentId, updateCategoryName, updateDeleteId } = categoriesArtistSlice.actions;

// Export du reducer généré par createSlice
export default categoriesArtistSlice.reducer;