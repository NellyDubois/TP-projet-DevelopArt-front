import { handleSuccessfulSend, handleContactError } from './contactSlice';

const contactMiddleware = (store) => (next) => (action) => {
  
  if (action.type === 'SUBMIT_CONTACT') {

    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/envoyer-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          firstname: store.getState().contact.firstname,
          lastname: store.getState().contact.lastname,
          phone: store.getState().contact.phone,
          story: store.getState().contact.story,
          email: store.getState().contact.email,
          objectEmail: store.getState().contact.objectEmail,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          const errorAction = handleContactError("Les champs renseignés sont invalides");
          store.dispatch(errorAction);
          throw new Error("Erreur lors de l'envoi du formulaire de contact");
        }
        else {
          const contactAction = handleSuccessfulSend("Votre message a bien été envoyé");
          store.dispatch(contactAction)
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error)
      });
  }
  return next(action);
};

export default contactMiddleware;