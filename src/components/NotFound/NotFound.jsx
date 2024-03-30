// Import des styles spécifiques à ce composant
import './NotFound.scss';

// Définition du composant NotFound
export default function NotFound() {
  return (
    <div className="notFound">
      <img className="notFound_img" src="/img/404.png" width="400px" alt="Page non trouvée" />
    </div>
  );
}
