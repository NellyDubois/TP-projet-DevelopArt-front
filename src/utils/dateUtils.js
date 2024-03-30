// Fonction pour formater une date: Cette fonction prend une date au format ISO 8601 (par exemple "2022-03-14T10:30:00.000Z") et la transforme en une date au format "YYYY-MM-DD" (par exemple "2022-03-14") en supprimant tout ce qui se trouve après le 'T'.
export function dateUtils(dateUpdate) {
  // La date est divisée en deux parties en utilisant 'T' comme séparateur
  // La première partie (avant le 'T') est la date, la deuxième partie (après le 'T') est l'heure
  // On garde seulement la première partie, c'est-à-dire la date
  dateUpdate = dateUpdate.split('T')[0];
  // On retourne la date mise à jour
  return dateUpdate;
}