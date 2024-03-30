// Import des actions de gestion de l'envoi du formulaire de contact
import { handleSuccessfulSend, handleContactError } from './contactSlice';

// Définition du middleware pour le formulaire de contact
const contactMiddleware = (store) => (next) => (action) => {
  // Vérification si l'action dispatchée est de type 'SUBMIT_CONTACT'
  if (action.type === 'SUBMIT_CONTACT') {
    // Si c'est le cas, on effectue une requête POST vers l'API pour envoyer le formulaire de contact
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/envoyer-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Envoi des données du formulaire de contact
        firstname: store.getState().contact.firstname,
        lastname: store.getState().contact.lastname,
        phone: store.getState().contact.phone,
        story: store.getState().contact.story,
        email: store.getState().contact.email,
        objectEmail: store.getState().contact.objectEmail,
      }),
    })
      .then((res) => {
        // Vérification si la réponse est OK
        if (!res.ok) {
          // Si ce n'est pas le cas, on dispatche une action d'erreur
          const errorAction = handleContactError("Les champs renseignés sont invalides");
          store.dispatch(errorAction);
          // Et on lance une erreur
          throw new Error("Erreur lors de l'envoi du formulaire de contact");
        }
        else {
          // Si la réponse est OK, on dispatche une action de succès
          const contactAction = handleSuccessfulSend("Votre message a bien été envoyé");
          store.dispatch(contactAction)
        }
        return res.json(); // Conversion de la réponse en JSON
      })
      .then((data) => {
        // Affichage des données reçues dans la console
        console.log(data);
      })
      .catch((error) => {
        // Affichage de l'erreur dans la console
        console.log(error)
      });
  }
  // Si l'action dispatchée n'est pas de type 'SUBMIT_CONTACT', on passe simplement à l'action suivante
  return next(action);
};

// Export du middleware pour le formulaire de contact
export default contactMiddleware;