// Import des actions à dispatcher en cas de succès ou d'échec de la connexion
import { handleSuccessfulLogin, handleLoginError } from './artistSlice';

// Définition du middleware d'authentification
const authMiddleware = (store) => (next) => (action) => {
  // Définition des expressions régulières pour la validation de l'email et du mot de passe
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[a-zA-Z0-9!?*_%]{8,12}$/;
  
  // Vérification si l'action dispatchée est de type 'SUBMIT_LOGIN'
  if (action.type === 'SUBMIT_LOGIN') {
    // Si c'est le cas, on effectue une requête POST vers l'API pour se connecter
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Envoi de l'email et du mot de passe pour la connexion
        email: store.getState().artist.emailLog,
        password: store.getState().artist.passwordLog
      }),
    })
      .then((res) => {
        // Si la réponse n'est pas OK, on lance une erreur
        if (!res.ok) {
          throw new Error('Erreur de connexion');
        }
        // Sinon, on convertit la réponse en JSON
        return res.json();
      })
      .then((data) => {
        // Si la connexion est réussie, on dispatche l'action de succès de connexion avec les données reçues
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
      })
      .catch((error) => {
        // Si une erreur se produit, on dispatche l'action d'échec de connexion avec un message d'erreur
        const errorAction = handleLoginError("Email ou mot de passe invalide");
        store.dispatch(errorAction);
      });
  }
  // Si l'action dispatchée n'est pas de type 'SUBMIT_LOGIN', on passe simplement à l'action suivante
  return next(action);
};

// Export du middleware d'authentification
export default authMiddleware;