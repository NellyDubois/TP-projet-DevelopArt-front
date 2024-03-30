// Import de la fonction createSlice de Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Définition de l'état initial du slice de l'artiste
export const initialState = {
  logged: localStorage.getItem('token') ? true : false, // L'artiste est considéré comme connecté si un token est stocké dans le localStorage
  artwork: [], // Tableau pour stocker les œuvres d'art de l'artiste
  token: localStorage.getItem('token') || '', // Le token de l'artiste est récupéré du localStorage s'il existe, sinon une chaîne vide est utilisée
  loggedError: '', // Chaîne pour stocker les erreurs de connexion
  emailLog: '', // Chaîne pour stocker l'email de connexion de l'artiste
  passwordLog: '', // Chaîne pour stocker le mot de passe de connexion de l'artiste
};

// Création du slice de l'artiste avec Redux Toolkit
const artistSlice = createSlice({
  name: 'artist', // Nom du slice
  initialState, // État initial du slice
  reducers: { // Les reducers pour gérer les actions sur l'état du slice
    // Reducer pour récupérer les données de l'artiste et les mettre dans l'état
    getDataArtist: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        ...action.payload, // Ajout des données de l'artiste à l'état
        password: '' // Réinitialisation du mot de passe pour des raisons de sécurité
      };
    },
    // Reducer pour récupérer les œuvres d'art de l'artiste
    updateArtwork: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        artwork: action.payload, // Ajout des œuvres d'art à l'état
      };
    },
    // Reducer pour gérer les champs de formulaire de connexion
    changeFieldValue: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        // Mise à jour de la valeur du champ spécifié (email ou mot de passe)
        [action.payload.inputName]: action.payload.inputValue,
      };
    },
    // Reducer pour gérer la connexion réussie de l'artiste
    handleSuccessfulLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token); // Stockage du token dans le localStorage
      const token = localStorage.getItem('token'); // Récupération du token du localStorage
      return {
        ...state, // Copie de l'état actuel
        ...action.payload, // Ajout des données de l'artiste à l'état
        logged: true, // L'artiste est maintenant connecté
        firstname: action.payload.firstname, // Mise à jour du prénom de l'artiste
        token, // Mise à jour du token de l'artiste
      };
    },
    // Reducer pour gérer la déconnexion de l'artiste
    handleSuccesfulLogout: (state, action) => {
      localStorage.removeItem('token'); // Suppression du token du localStorage
      sessionStorage.removeItem('messageUpload') // Suppression du message d'upload de la session
      return {
        ...state, // Copie de l'état actuel
        emailLog: '', // Réinitialisation de l'email de connexion
        passwordLog: '', // Réinitialisation du mot de passe de connexion
        logged: false, // L'artiste est maintenant déconnecté
        token: '', // Réinitialisation du token
        loggedError: '', // Réinitialisation de l'erreur de connexion
      };
    },
    // Reducer pour gérer les erreurs de connexion
    handleLoginError: (state, action) => {
      return {
        ...state, // Copie de l'état actuel
        loggedError: action.payload, // Mise à jour de l'erreur de connexion
      };
    },
  },
});

// Export des actions du slice de l'artiste
export const {
  updateArtwork,
  changeFieldValue,
  handleSuccessfulLogin,
  handleSuccesfulLogout,
  handleLoginError,
  getDataArtist,
  uploadMessage
} = artistSlice.actions;

// Export du reducer du slice de l'artiste
export default artistSlice.reducer;