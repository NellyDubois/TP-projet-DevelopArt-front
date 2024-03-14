import { useDispatch, useSelector } from "react-redux";
import LoginForm from "./LoginForm/LoginForm";
import { changeFieldValue, handleLoginError,handleSuccesfulLogout } from "../../store/artistSlice.js";

export default function LoginPage() {
    const dispatch = useDispatch();
    const email = useSelector((state) => state.artist.emailLog);
    const password = useSelector((state) => state.artist.passwordLog);
    const logged = useSelector((state) => state.artist.logged);
    const loggedError = useSelector((state) => state.artist.loggedError);
    const firstName = useSelector((state) => state.artist.firstname);
    const font_color = useSelector((state) => state.configuration.font_color);
    const background_color = useSelector((state) => state.configuration.background_color);
    const loggedMessage = <span style={{ color: font_color, backgroundColor: background_color }}>Bonjour {firstName} !</span>;
   
  
    // Cette fonction s'enclenchera lorsqu'un utilisateur tape dans le champ email ou password du formulaire de connexion
    // Ici inputName vaudra soit 'email' soit 'password' selon le champ utilisé
    function changeField(inputValue, inputName) {  
      const action = changeFieldValue({ inputName, inputValue });
      dispatch(action);
    }

    // Cette fonction s'enclenchera lorsqu'un utilisateur soumettra le formulaire de connexion
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

    // Cette fonction s'enclenchera lorsque l'utilisateur se deconnecte
    function handleLogout() {
      const action = handleSuccesfulLogout();
      dispatch(action);
    }
    return (
      <div style={{ backgroundColor: background_color, minHeight: '100vh' }}>
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