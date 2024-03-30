// Fonction pour créer un slug à partir d'un nom
export function createSlug(name) {
  // Conversion du nom en minuscules
  // Remplacement de tous les espaces par des tirets
  // Remplacement de tous les caractères qui ne sont pas des lettres, des chiffres ou des tirets par rien
  return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}