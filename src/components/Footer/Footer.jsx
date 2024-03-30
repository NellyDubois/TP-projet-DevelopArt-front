// Import des hooks nécessaires de React et Redux
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// Import du composant NavLink de react-router-dom pour la navigation
import { NavLink } from 'react-router-dom';
// Import des styles spécifiques à ce composant
import './Footer.scss';

// Import des icônes des réseaux sociaux de Material-UI
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

// Définition du composant Footer
export default function Footer() {
  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  // On récupère les couleurs de la police et du fond depuis la configuration
  const font_color = useSelector((state) => state.configuration.font_color);
  const background_color = useSelector((state) => state.configuration.background_color)
  
  // On récupère les informations de l'artiste
  const artist = useSelector((state) => state.artist);

  // Définition d'un état local pour les données (non utilisé dans le code actuel)
  const [data, setData] = useState(null);

// Rendu du composant
// Les styles sont définis en ligne pour utiliser les couleurs récupérées depuis l'état
//Note sécurité : 'attribut target="_blank" dans une balise <a> indique que le lien doit être ouvert dans une nouvelle fenêtre ou un nouvel onglet du navigateur. Cependant, l'utilisation de target="_blank" seul peut présenter un problème de sécurité, car la nouvelle page a accès à l'objet window de la page d'origine via window.opener, ce qui peut permettre à la nouvelle page de rediriger la page d'origine vers un URL différent.Pour résoudre ce problème, on utilise rel="noopener noreferrer" :noopener indique au navigateur d'ouvrir le lien dans un nouveau processus sans accès à la page d'origine. Cela empêche la nouvelle page d'avoir accès à l'objet window de la page d'origine et protège contre les attaques par tabnapping.noreferrer indique au navigateur de ne pas envoyer un en-tête HTTP Referer lors de la demande de la nouvelle page. Cela empêche la nouvelle page de savoir d'où vient la demande.
  return (
    <footer className="footer-container" style={{ color: font_color, backgroundColor: background_color }}>
      <div className="footer-content">
        <p className="footer_p" style={{ color: font_color }}>
          Tous droits réservés |
          <NavLink aria-label="Mentions légales" style={{ color: font_color }} to="/:artiste/mentions" className="footer_nav"> Mentions Légales</NavLink>
        </p>
        <nav aria-label="Réseaux sociaux" className="social-icons">
          <div className="space"></div> {/* Ajout d'un div pour l'espace */}
          <div className="icons-container">
            <a href={artist.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FacebookIcon style={{ color: font_color }}/>
            </a>
            <a href={artist.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <TwitterIcon style={{ color: font_color }}/>
            </a>
            <a href={artist.insta} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon style={{ color: font_color }}/>
            </a>
            <a href={artist.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <YouTubeIcon style={{ color: font_color }}/>
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}


