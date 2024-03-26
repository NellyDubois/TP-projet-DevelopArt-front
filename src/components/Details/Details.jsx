import './Details.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Details() {
  const detailsArtwork = useSelector((state) => state.details.list);

  return (
    <article className="details" aria-label="Détails de l'œuvre d'art">
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
