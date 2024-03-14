export const handleFetchErrors = async (response) => {
    if (!response.ok) {
        sessionStorage.setItem('messageUpload', "Une erreur est survenue")
      const errorMessage = await response.text();
      throw new Error(errorMessage || 'Erreur lors de la soumission du formulaire');
    }
    else {
        sessionStorage.setItem('messageUpload', "L'image a été téléchargé avec succès !")
    return response.json();
    }
  };