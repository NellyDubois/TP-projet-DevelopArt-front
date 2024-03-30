// Import de la fonction de gestion des erreurs de fetch
import { handleFetchErrors } from './errorUtils';

// Fonction pour télécharger une œuvre d'art sur le serveur via un fetch vers l'API
export const uploadArtworkToServer = async (formDataToSend) => {
  // Récupération du token depuis le localStorage
  const token = localStorage.getItem('token');
  // Envoi d'une requête POST à l'API pour télécharger l'œuvre d'art
  const response = await fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/telechargement-oeuvre`, {
    method: 'POST', // Méthode de la requête
    body: formDataToSend, // Données à envoyer, contenues dans un objet FormData
    headers: {
      // Ajout du token à l'en-tête de la requête pour l'autorisation
      Authorization: `Bearer ${token}`,
    },       
  });
  // Appel de la fonction handleFetchErrors pour gérer les erreurs de la requête fetch
  // et retour de son résultat
  return handleFetchErrors(response);
};