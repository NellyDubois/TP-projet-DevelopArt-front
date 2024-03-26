import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './Footer.scss';

// On importe les icônes des réseaux sociaux
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
  const font_color = useSelector((state) => state.configuration.font_color);
  const background_color = useSelector((state) => state.configuration.background_color)
  
  const artist = useSelector((state) => state.artist);

  const [data, setData] = useState(null);

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


