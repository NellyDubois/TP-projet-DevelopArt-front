import { handleFetchErrors } from './errorUtils';

// Fonction pour récupérer les oeuvres via un fetch vers l'API. Les données sont envoyées via l'objet formData.
//Dans la requête fetch, on utilise la méthode POST pour envoyer les données et le fichier vers le serveur et on ajoute le token dans le header de la requête.
export const uploadArtworkToServer = async (formDataToSend) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/telechargement-oeuvre`, {
        method: 'POST',
        body: formDataToSend, 
        headers: {
            Authorization: `Bearer ${token}`,
        },       
  });
  // La fonction handleFetchErrors est appelée pour gérer les erreurs de la requête fetch
  return handleFetchErrors(response);
};

