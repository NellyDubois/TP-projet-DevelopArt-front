// Import des hooks nécessaires de React et Redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Hook pour la navigation
import './Nav.scss'; // Import des styles spécifiques à ce composant
import { NavLink } from 'react-router-dom'; // Composant pour les liens de navigation
import { useState } from 'react'; // Hook d'état de React

// Import des composants nécessaires de Material UI pour le dialogue de déconnexion
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Import de l'action pour gérer la déconnexion
import { handleSuccesfulLogout } from "../../store/artistSlice.js";

// Définition du composant Nav
export default function Nav() {
  
  // Utilisation des hooks useDispatch et useNavigate pour dispatcher des actions et naviguer
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  const isLogged = useSelector((state) => state.artist.logged);
  const font_color = useSelector((state) => state.configuration.font_color);
  const background_color = useSelector((state) => state.configuration.background_color);
  const background_color_nav = useSelector((state) => state.configuration.background_color_nav);

  // Définition de l'état local pour gérer l'ouverture du dialogue de déconnexion
  const [open, setOpen] = useState(false);

  // Fonction pour ouvrir le dialogue de déconnexion
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Fonction pour fermer le dialogue de déconnexion
  const handleClose = () => {
    setOpen(false);
  };

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    // Dispatch de l'action pour gérer la déconnexion
    dispatch(handleSuccesfulLogout());
    // Fermeture du dialogue de déconnexion
    handleClose();
    // Redirection vers la page d'accueil
    navigate('/');
  };

  // Fonction pour gérer le clic sur le lien de déconnexion
  const handleLogoutClick = (event) => {
    // Empêche la navigation
    event.preventDefault();
    // Ouverture du dialogue de déconnexion
    handleClickOpen();
  };

  // Rendu du composant
  return (
    <nav className="header_nav" style={{ color: font_color, backgroundColor: background_color_nav }} aria-label="Menu principal">
      <ul className="header_nav_ul">
        <li className="header_nav_ul_li">
          <NavLink to="/" className="navLink" aria-label="Accueil">Accueil</NavLink>
        </li>

        <li className="header_nav_ul_li">
          <NavLink to="/galerie" className="navLink" aria-label="Galerie">Galerie</NavLink>
        </li>

        <li className="header_nav_ul_li">
          <NavLink to="/contact" className="navLink" aria-label="Contact">Contact</NavLink>
        </li>

        {isLogged && (
          <li className="header_nav_ul_li">
            <NavLink to="/:artiste/personnalisation" className="navLink" aria-label="Personnalisation">Personnalisation</NavLink>
          </li>
        )}

        <li className="header_nav_ul_li">
          {isLogged ? (
            <NavLink to="#" onClick={handleLogoutClick} className="navLink" aria-label="Se déconnecter">Se déconnecter</NavLink>
          ) : (
            <NavLink to="/connexion" className="navLink" aria-label="Se connecter">Se connecter</NavLink>
          )}
        </li>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation de déconnexion"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir vous déconnecter ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleLogout} aria-label="Confirmer la déconnexion">Oui</Button>
            <Button onClick={handleClose} aria-label="Annuler la déconnexion" autoFocus>Non</Button>
          </DialogActions>
        </Dialog>
      </ul>
    </nav>
  );
}