// Import des styles spécifiques à ce composant
import './Loading.scss';

// Import de l'image utilisée pour l'indicateur de chargement
import paletteIcon from '/img/spinner_camera.png'; 

// Définition du composant Loading
export default function Loading() {
  // Rendu du composant
  return (
    <div className="loading" aria-busy="true">
      <p>En cours de chargement...</p>
      <img src={paletteIcon} alt="Loading" className="loading__spinner" />
    </div>
  );
}
