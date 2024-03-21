import './Details.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Details() {
  const detailsArtwork = useSelector((state) => state.details.list);

  return (
    <div className="details">
      <div className="details_img">
        <img src={`${process.env.REACT_APP_BASE_URL_BACK}${detailsArtwork}`} alt={detailsArtwork.name} />
      </div>
      <div className="details_description">
        <h2 className="details_description titre">"{detailsArtwork.name}"</h2>
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
      </div>
    </div>
  );
}
