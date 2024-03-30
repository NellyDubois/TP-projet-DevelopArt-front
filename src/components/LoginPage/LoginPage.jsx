// Import des hooks nécessaires de Redux
import { useDispatch, useSelector } from "react-redux";
// Import du composant LoginForm
import LoginForm from "./LoginForm/LoginForm";
// Import des actions nécessaires du slice artist
import { changeFieldValue, handleLoginError,handleSuccesfulLogout } from "../../store/artistSlice.js";

// Définition du composant LoginPage
export default function LoginPage() {
    // Utilisation du hook useDispatch pour pouvoir dispatcher des actions
    const dispatch = useDispatch();
    // Utilisation du hook useSelector pour accéder à l'état du store Redux
    const email = useSelector((state) => state.artist.emailLog);
    const password = useSelector((state) => state.artist.passwordLog);
    const logged = useSelector((state) => state.artist.logged);
    const loggedError = useSelector((state) => state.artist.loggedError);
    const firstName = useSelector((state) => state.artist.firstname);
    const font_color = useSelector((state) => state.configuration.font_color);
    const background_color = useSelector((state) => state.configuration.background_color);

    // Création du message de bienvenue pour l'utilisateur connecté
    const loggedMessage = <span style={{ color: font_color, backgroundColor: background_color }}>Bonjour {firstName} !</span>;
   
    // Fonction pour gérer le changement de valeur des champs du formulaire de connexion
    function changeField(inputValue, inputName) {  
      const action = changeFieldValue({ inputName, inputValue });
      dispatch(action);
    }

    // Fonction pour gérer la soumission du formulaire de connexion
    function handleLogin() {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/;
      let action = ""
      if (emailRegex.test(email) && passwordRegex.test(password)) {
        action = { type: 'SUBMIT_LOGIN' };
      }
      else {
        action = handleLoginError("Email ou mot de passe invalide");
      }
      dispatch(action);
    }

    // Fonction pour gérer la déconnexion de l'utilisateur
    function handleLogout() {
      const action = handleSuccesfulLogout();
      dispatch(action);
    }

// Rendu du composant LoginPage qui contient le composant LoginForm
// <LoginForm />` composant enfant qui représente le formulaire de connexion reçoit plusieurs props :
//   - `email` et `password` : valeurs des champs email et mot de passe du formulaire de connexion.
//   - `changeField` : fonction qui est appelée lorsque l'utilisateur change la valeur de l'un des champs du formulaire.
//   - `handleLogin` et `handleLogout` : fonctions qui sont appelées lorsque l'utilisateur soumet le formulaire de connexion ou se déconnecte, respectivement.
//   - `isLogged` : booléen qui indique si l'utilisateur est connecté ou non.
//   - `loggedMessage` : message de bienvenue qui est affiché lorsque l'utilisateur est connecté.
//   - `loggedError` : message d'erreur qui est affiché si une erreur se produit lors de la connexion de l'utilisateur.
      return (
      <div style={{ backgroundColor: background_color, minHeight: '100vh' }} aria-label="Page de connexion">
          <LoginForm
            email={email}
            password={password}
            changeField={changeField}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            isLogged={logged}
            loggedMessage={loggedMessage}
            loggedError={loggedError}
          />
      </div>
  );
}