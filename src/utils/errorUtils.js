// Fonction pour gérer les erreurs de fetch
export const handleFetchErrors = async (response) => {
  // Si la réponse n'est pas OK (c'est-à-dire si le code de statut HTTP n'est pas dans la plage 200-299)
  if (!response.ok) {
    // On définit un message d'erreur dans le sessionStorage
    sessionStorage.setItem('messageUpload', "Une erreur est survenue");
    // On récupère le message d'erreur de la réponse
    const errorMessage = await response.text();
    // On lance une erreur avec le message d'erreur récupéré, ou un message d'erreur par défaut si le message d'erreur récupéré est vide
    throw new Error(errorMessage || 'Erreur lors de la soumission du formulaire');
  }
  else {
    // Si la réponse est OK, on définit un message de succès dans le sessionStorage
    sessionStorage.setItem('messageUpload', "L'image a été téléchargée avec succès !");
    // On retourne la réponse convertie en JSON
    return response.json();
  }
};