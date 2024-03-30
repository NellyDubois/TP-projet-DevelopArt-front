// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice du contact
export const initialState = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  story: '',
  objectEmail: '',
  message: ''
};

// Création du slice du contact
const contactSlice = createSlice({
  name: 'contact', // Nom du slice
  initialState, // État initial
  reducers: { // Définition des reducers
    // Reducer pour gérer l'envoi réussi du formulaire de contact
    handleSuccessfulSend: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        message: action.payload, // Mise à jour du message avec la donnée reçue
      };
    },
    // Reducer pour gérer une erreur lors de l'envoi du formulaire de contact
    handleContactError: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        message: action.payload, // Mise à jour du message avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour l'email
    updateEmail: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        email: action.payload, // Mise à jour de l'email avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour l'objet de l'email
    updateObjectEmail: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        objectEmail: action.payload, // Mise à jour de l'objet de l'email avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour le prénom
    updateFirstname: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        firstname: action.payload, // Mise à jour du prénom avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour le nom de famille
    updateLastname: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        lastname: action.payload, // Mise à jour du nom de famille avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour l'histoire
    updateStory: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        story: action.payload, // Mise à jour de l'histoire avec la donnée reçue
      };
    },
    // Reducer pour mettre à jour le téléphone
    updatePhone: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        phone: action.payload, // Mise à jour du téléphone avec la donnée reçue
      };
    },
  },
});

// Export des actions générées par createSlice
export const { handleSuccessfulSend, updateEmail, updateLastname, updatePhone, updateFirstname, updateStory, handleContactError, updateObjectEmail } =
  contactSlice.actions;

// Export du reducer généré par createSlice
export default contactSlice.reducer;