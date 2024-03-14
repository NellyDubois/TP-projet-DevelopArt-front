// Fonction servant à bien formater la date en gardant que ce qu'il y a avant le "T" dans la date

export function dateUtils(dateUpdate) {
  dateUpdate = dateUpdate.split('T')[0];
  return dateUpdate;
}
