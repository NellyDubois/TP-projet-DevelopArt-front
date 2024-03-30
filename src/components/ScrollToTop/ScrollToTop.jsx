// Import des hooks nécessaires de React
import { useState, useEffect } from 'react';
// Import de l'icône FaArrowCircleUp de react-icons/fa
import { FaArrowCircleUp } from 'react-icons/fa';
// Import des styles spécifiques à ce composant
import './ScrollToTop.scss';

// Définition du composant ScrollToTop
function ScrollToTop() {

  // Utilisation du hook d'état pour gérer la visibilité du bouton
  const [isVisible, setIsVisible] = useState(false);

  // Utilisation du hook d'effet pour ajouter un écouteur d'événement au scroll de la fenêtre
  useEffect(() => {

    // Définition de la fonction pour basculer la visibilité
    const toggleVisibility = () => {
      // Si l'utilisateur a défilé plus de 300px, rendre le bouton visible
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        // Sinon, rendre le bouton invisible
        setIsVisible(false);
      }
    };

    // Ajout de l'écouteur d'événement au scroll de la fenêtre
    window.addEventListener('scroll', toggleVisibility);

    // Retour d'une fonction de nettoyage pour supprimer l'écouteur d'événement
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Fonction pour faire défiler la fenêtre jusqu'en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Rendu du composant
  return (
    // Utilisation d'une div pour le bouton, avec une classe conditionnelle pour la visibilité
    // Lorsque l'utilisateur clique sur le bouton, la fenêtre défile jusqu'en haut
    <div className={`scroll-to-top ${isVisible ? 'visible' : 'hidden'}`} onClick={scrollToTop} aria-label="Bouton pour retourner en haut de la page">
      {/* // Utilisation d'une autre div pour le cercle autour de l'icône */}
      <div className="circle">
        {/* // Affichage de l'icône FaArrowCircleUp */}
        <FaArrowCircleUp />
      </div>
    </div>
  );
}

export default ScrollToTop;