import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  logged: localStorage.getItem('token') ? true : false,
  artwork: [],
  token: localStorage.getItem('token') || '',
  loggedError: '',
  emailLog: '',
  passwordLog: '',
};

const artistSlice = createSlice({
  name: 'artist',
  initialState,
  reducers: {
    // reducer servant à récupérer les données de l'artiste et les mettre dans le state
    getDataArtist: (state, action) => {
      return {
        ...state,
        ...action.payload,
        password: ''
      };
    },
    // reducer servant à récupérer les oeuvres de l'artiste
    updateArtwork: (state, action) => {
      return {
        ...state,
        artwork: action.payload,
      };
    },
    // reducer servant de controlled input pour le champs email et mot de passe du formulaire de connexion
    changeFieldValue: (state, action) => {
      
      return {
        ...state,
        // inputName vaudra soit "email" soit "password" selon si le champ email ou password (qui sera déterminé avec la fonction changeField du composant LoginPage) du formulaire de connexion est en cours d'ecriture
        [action.payload.inputName]: action.payload.inputValue,
      };
    },
    // reducer servant à mettre les données à jour de l'artiste pour le token et le mettre l'artiste en tant que "connecté"
    handleSuccessfulLogin: (state, action) => {
      localStorage.setItem('token', action.payload.token);
      const token = localStorage.getItem('token');
      return {
        ...state,
        ...action.payload,
        logged: true,
        firstname: action.payload.firstname,
        token,
      };
    },
    // reducer servant à déconnecter l'artiste
    handleSuccesfulLogout: (state, action) => {
      localStorage.removeItem('token');
      sessionStorage.removeItem('messageUpload')
      return {
        ...state,
        emailLog: '',
        passwordLog: '',
        logged: false,
        token: '',
        loggedError: '',
      };
    },
    // reducer servant à gerer le message d'erreur lors de la connexion
    handleLoginError: (state, action) => {
      
      return {
        ...state,
        loggedError: action.payload,
      };
    },
  },
});

export const {
  updateArtwork,
  changeFieldValue,
  handleSuccessfulLogin,
  handleSuccesfulLogout,
  handleLoginError,
  getDataArtist,
  uploadMessage
} = artistSlice.actions;
export default artistSlice.reducer;
