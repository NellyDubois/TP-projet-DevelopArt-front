import { uploadArtworkToServer } from './apiUtils';

// La soumission du formulaire de téléchargement d'image déclenche la fonction handleSubmit, qui prend en paramètres les données du formulaire
export const handleSubmitForm = async (formData) => {
  // Création d'un objet FormData pour envoyer les données du formulaire et le fichier
  const formDataToSend = new FormData();
  // Ajout du fichier à envoyer
  formDataToSend.append('fichier', formData.file);
  // Ajout des données du formulaire à envoyer
  Object.entries(formData.data).forEach(([key, value]) => {
    formDataToSend.append(key, value);
  });
  //Avant l'envoi des données, la fonction uploadArtworkToServer est appelée. 
  //Cette fonction est responsable de l'envoi des données et du fichier vers le serveur via un appel fetch
  return uploadArtworkToServer(formDataToSend);
};