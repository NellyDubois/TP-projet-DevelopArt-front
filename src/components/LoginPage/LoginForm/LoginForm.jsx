import { useState } from 'react';
import './LoginForm.scss';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Field from './Field/Field';

// Composant servant de formulaire de connexion
// Les props (arguments de la fonction d'un composant) seront mise a partir du LoginPage

export default function LoginForm({
  email,
  password,
  changeField,
  handleLogin,
  handleLogout,
  isLogged,
  loggedMessage,
  loggedError
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin();
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <section className="login-form">
      {isLogged && ( // Cette partie de composant sera affiché une fois que l'artiste sera connecté sinon ça affiche l'autre partie
        <div className="login-form-logged">
          <p className="login-form-message">{loggedMessage}</p>
          <button
            type="button"
            className="login-form-logged-button"
            onClick={handleLogout}
            aria-label="Déconnexion"
          >
            Déconnexion
          </button>
        </div>
      )}
      {!isLogged && (
        <form className="login-form-element" onSubmit={handleSubmit}>
          <fieldset className="login-form-fieldset">
            <legend className="login-form-legend">SE CONNECTER</legend>
            <label className="login-form-label" htmlFor="email">
              Email
            </label>
            <Field name="emailLog" onChange={changeField} value={email} />
            <label className="login-form-label" htmlFor="password">
              Mot de passe
            </label>
          <div className="password-container">
            <Field
              type={showPassword ? 'text' : 'password'}
              name="passwordLog"
              onChange={changeField}
              value={password}
            />
            <IconButton
              className="password-toggle"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'} 
            >
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>
            {loggedError && ( // message d'erreur qui s'affiche si jamais la connexion echoue et qui disparait une fois l'artiste connecté
              <div className="login-form-error">
                <p className="login-form-error-message">{loggedError}</p>
              </div>
            )}
            <button type="submit" className="login-form-button">
              Valider
            </button>
          </fieldset>
        </form>
      )}
    </section>
  );
}
