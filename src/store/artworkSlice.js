/*Import de la fonction createSlice à partir de la bibliothèque @reduxjs/toolkit pour créer un slice Redux nommé artworkSlice. Ce slice contient l'état initial de l'application pour la gestion des œuvres d'art, ainsi que des reducers pour mettre à jour la liste des œuvres d'art et l'identifiant de l'œuvre d'art à supprimer.*/

import { createSlice } from '@reduxjs/toolkit';

/*Définition d'un objet initialState contenant les propriétés initiales de l'état du slice, notamment deleteId initialisé à une chaîne vide et list initialisé à un tableau vide.*/
export const initialState = {
  deleteId: '',
  list: [],
};
/* Création du slice Redux artworkSlice à l'aide de la fonction createSlice. Ce slice contient un état initial et les reducers pour mettre à jour la liste des œuvres d'art et l'identifiant de l'œuvre d'art à supprimer*/
const artworkSlice = createSlice({
  name: 'artwork', /*Donne un nom au slice, ce qui permet de l'identifier dans l'arbre de l'état global Redux.*/
  initialState, /*Utilise l'état initial défini précédemment pour initialiser le slice*/

  /*Définit les réducteurs du slice, qui sont des fonctions permettant de mettre à jour l'état en réponse à des actions. Chaque réducteur prend l'état actuel et une action en paramètres, et retourne un nouvel état mis à jour. Réducteur pour mettre à jour la liste des œuvres d'art dans l'état du slice en remplaçant l'ancienne liste par la nouvelle liste fournie dans l'action  */
  /*syntaxe de décomposition (spread syntax) pour créer une copie de l'état actuel du slice. Cela garantit que nous n'affectons pas directement l'état existant.*/
  /*met à jour la propriété list de l'état en utilisant la valeur fournie dans action.payload. L'action contient généralement des données nécessaires pour mettre à jour l'état.*/
  reducers: {   
    updateArtworkList: (state, action) => {
      return {
         ...state, 
        list: action.payload, 
      };
    },
    /*Définition d'un réducteur nommé updateDeleteId, qui met à jour l'identifiant de l'œuvre d'art à supprimer dans l'état en remplaçant l'ancien identifiant par le nouvel identifiant fourni dans l'action.*/
    updateDeleteId: (state, action) => {
      return {
        ...state,
        deleteId: action.payload,
      }
    } 
  },

});

/*Exporte les actions du slice, y compris updateArtworkList et updateDeleteId, pour les rendre disponibles à l'utilisation dans d'autres parties de l'application.*/
export const {
 
  updateArtworkList, updateDeleteId,
} = artworkSlice.actions;

/*Exporte le réducteur du slice par défaut, permettant ainsi de l'intégrer dans le store Redux de l'application.*/
export default artworkSlice.reducer;
