import './Loading.scss';

// export default function Loading() {
//   return (
//   <div className="loading">
//     <p>En cours de chargement</p>
//     <div className="loading__spinner"></div>
//   </div>
//   );
// }

import paletteIcon from '/img/spinner_camera.png'; 

export default function Loading() {
  return (
    <div className="loading">
      <p>En cours de chargement...</p>
      <img src={paletteIcon} alt="Loading" className="loading__spinner" />
    </div>
  );
}
