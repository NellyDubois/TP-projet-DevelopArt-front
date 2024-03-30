/*Définit d'un middleware Redux appelé artworkMiddleware qui est responsable de récupérer les données des oeuvres d'art grâce à l'API vers backend et de les mettre à jour dans le Redux store en utilisant l'action updateArtworkList définie dans le slice artworkSlice.*/

/*Import de l'action updateArtworkList depuis le slice artworkSlice.js, qui contient les actions et le reducer associés aux oeuvres d'art dans le store Redux.*/
import { updateArtworkList } from './artworkSlice';

/*définit un middleware Redux sous forme d'une fonction curry qui reçoit en argument le store Redux et retourne une autre fonction qui prend en argument next (la fonction suivante dans la chaîne de middleware) et action (l'action en cours de dispatch).*/
const artworkMiddleware = (store) => (next) => (action) => {
  // si l'action dispatchée est de type 'ARTWORK_GALLERY',le middleware effectue une requête GET à l'API backend pour récupérer les données des oeuvres d'art.
  if (action.type === 'ARTWORK_GALLERY') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/oeuvres`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json()) // convertit la réponse en JSON
      .then((data) => { //méthode appelée avec les données JSON récupérées. À l'intérieur de cette fonction, les données sont utilisées pour créer une action updateArtworkList, qui mettra à jour la liste des oeuvres d'art dans le store Redux.
        const artData = updateArtworkList(data);
        console.log('artData', artData);
        store.dispatch(artData); //dispatche l'action créée à partir des données des oeuvres d'art récupérées vers le store Redux.Une fois dans le store, l'action déclenchera les réducteurs appropriés pour mettre à jour l'état de l'application en conséquence, permettant ainsi à l'interface utilisateur de refléter les nouvelles données récupérées.

      });
  }
  next(action); //appelle la fonction suivante dans la chaîne de middleware, ce qui permet à l'action de continuer à travers les autres middlewares ou le reducer.
};

export default artworkMiddleware;
