// Import des hooks nécessaires et du style
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Banner.scss';

// Composant Banner
export default function Banner() {
  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  // et récupérer l'image de la bannière et le logo
  const bannerImage = useSelector((state) => state.configuration.banner);
  const logoUrl = useSelector((state) => state.configuration.logo);

  // Définition du style de la bannière
  const bannerStyle = {
    backgroundImage: `url(${bannerImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };
  
  // Rendu du composant
  return (
    // Utilisation de l'élément header pour la sémantique et l'accessibilité
    <header className="banner" style={bannerStyle}>
      {/* Utilisation de Link pour la navigation */}
      <Link to="/" className="banner_logo_link" aria-label="Retour à la page d'accueil">
        {/* Image du logo avec texte alternatif pour l'accessibilité */}
        <img
          className="banner_logo"
          src={logoUrl}
          alt="Logo de Develop Art, retour à la page d'accueil"
        />
      </Link>
      {/* Contenu de la bannière */}
    </header>
  );
}