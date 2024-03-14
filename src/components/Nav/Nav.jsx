import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Nav.scss';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { handleSuccesfulLogout } from "../../store/artistSlice.js";

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.artist.logged);
  const font_color = useSelector((state) => state.configuration.font_color);
  const background_color = useSelector((state) => state.configuration.background_color);
  const background_color_nav = useSelector((state) => state.configuration.background_color_nav);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(handleSuccesfulLogout());
    handleClose();
    navigate('/');
  };

  const handleLogoutClick = (event) => {
    event.preventDefault(); // Empêche la navigation
    handleClickOpen();
  };

  return (
    <nav className="header_nav" style={{ color: font_color, backgroundColor: background_color_nav }}>
      <ul className="header_nav_ul">
        <li className="header_nav_ul_li">
          <NavLink to="/" className="navLink">Accueil</NavLink>
        </li>

        <li className="header_nav_ul_li">
          <NavLink to="/galerie" className="navLink">Galerie</NavLink>
        </li>

        <li className="header_nav_ul_li">
          <NavLink to="/contact" className="navLink">Contact</NavLink>
        </li>

        {isLogged && (
          <li className="header_nav_ul_li">
            <NavLink to="/:artiste/personnalisation" className="navLink">Personnalisation</NavLink>
          </li>
        )}

        <li className="header_nav_ul_li">
          {isLogged ? (
            <NavLink to="#" onClick={handleLogoutClick} className="navLink">Se déconnecter</NavLink>
          ) : (
            <NavLink to="/connexion" className="navLink">Se connecter</NavLink>
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
            <Button onClick={handleLogout}>Oui</Button>
            <Button onClick={handleClose} autoFocus>
              Non
            </Button>
          </DialogActions>
        </Dialog>
      </ul>
    </nav>
  );
}