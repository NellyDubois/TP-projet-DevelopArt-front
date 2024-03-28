import { handleSuccessfulLogin, handleLoginError } from './artistSlice';

const authMiddleware = (store) => (next) => (action) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegex = /^[a-zA-Z0-9!?*_%]{8,12}$/;
  
  if (action.type === 'SUBMIT_LOGIN') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: store.getState().artist.emailLog,
        password: store.getState().artist.passwordLog
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Erreur de connexion');
        }
        return res.json();
      })
      .then((data) => {
        const loginAction = handleSuccessfulLogin(data);
        store.dispatch(loginAction);
      })
      .catch((error) => {
        const errorAction = handleLoginError("Email ou mot de passe invalide");
        store.dispatch(errorAction);
      });
  }
  return next(action);
};

export default authMiddleware;