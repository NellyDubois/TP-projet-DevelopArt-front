import { uploadArtworkToServer } from './apiUtils';

export const handleSubmitForm = async (formData) => {
  // Création d'un objet FormData pour envoyer les données du formulaire et le fichier
  const formDataToSend = new FormData();
  formDataToSend.append('fichier', formData.file);
  Object.entries(formData.data).forEach(([key, value]) => {
    formDataToSend.append(key, value);
  });
  console.log(formData.data);
  return uploadArtworkToServer(formDataToSend);
};