// Importdes styles spécifiques à ce composant
import './Details.scss';

// Importdes hooks nécessaires de Redux et React
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

// Définition du composant Details
export default function Details() {
  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  // On récupère les détails de l'œuvre d'art
  const detailsArtwork = useSelector((state) => state.details.list);

  // Rendu du composant
  return (
    <article className="details" aria-label="Détails de l'œuvre d'art">
    {/* La balise <figure> est utilisée pour grouper le contenu lié à une seule image */}
      <figure className="details_img">
        <img src={`${process.env.REACT_APP_BASE_URL_BACK}/${detailsArtwork.path}`} alt={`Oeuvre d'art nommée ${detailsArtwork.name}`}/>
      </figure>
      <section className="details_description">
        <h1 className="details_description titre">"{detailsArtwork.name}"</h1>
        <p className="details_description citation">{detailsArtwork.quote}</p>
        <p className="details_description description">
          {detailsArtwork.description}
        </p>
        <p className="details_description orientation">
          Orientation : {detailsArtwork.orientation}
        </p>
        <p className="details_description media">
          Media : {detailsArtwork.media}
        </p>
        <p className="details_description dimensions">
          Dimensions : largeur : {detailsArtwork.width} cm et hauteur :
          {detailsArtwork.height} cm
        </p>
      </section>
    </article>
  );
}
