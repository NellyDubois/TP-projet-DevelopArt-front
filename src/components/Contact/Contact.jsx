import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Place, Phone, Mail } from '@mui/icons-material';

import './Contact.scss';

// On importe GoogleMap pour afficher la map, useJsApiLoader pour la gestion du chargement de la map, et Marker pour afficher de marqueurs sur la map
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';
import {
  updateEmail,
  updateFirstname,
  updateLastname,
  updatePhone,
  updateStory,
  updateObjectEmail,
} from '../../store/contactSlice';

export default function Contact() {
  const dispatch = useDispatch();
  const artist = useSelector((state) => state.artist);
  const email = useSelector((state) => state.contact.email);
  const lastname = useSelector((state) => state.contact.lastname);
  const story = useSelector((state) => state.contact.story);
  const phone = useSelector((state) => state.contact.phone);
  const firstname = useSelector((state) => state.contact.firstname);
  const objectEmail = useSelector((state) => state.contact.objectEmail);
  const [shakeFields, setShakeFields] = useState(false);

  // On met en place useJsApiLoader pour gérer les erreurs de chargement de la map
  const { isLoaded, loadError } = useJsApiLoader({
    // On utilise la variable d'environnement pour utiliser la clé API Google Maps
    googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`,
  });

  // Utilisation de useState pour gérer l'état du centre de la carte et de l'ouverture de l'infobulle
  const [center, setCenter] = useState(null);
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);

  // Fonction pour inverser l'état de l'infobulle lorsqu'on clique sur le marqueur
  const handleMarkerClick = () => {
    setInfoWindowOpen(!infoWindowOpen); // Inverse l'état
  };

  // Utilisation de useEffect pour effectuer le géocodage de l'adresse de l'artiste
  useEffect(() => {
    if (artist && isLoaded) {
      const address = `${artist.street_no} ${artist.street_name}, ${artist.zipcode} ${artist.city}`;
      const geocoder = new window.google.maps.Geocoder();
      // Géocodage de l'adresse pour obtenir les coordonnées géographiques
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          // Mise à jour du centre de la carte avec les coordonnées obtenues
          setCenter({ lat: lat(), lng: lng() });
        } else {
          console.error('Le géocodage a échoué avec le status :', status);
        }
      });
    }
  }, [artist, isLoaded]);

  // On vérifie s'il y a une erreur de chargement de l'API Google Maps
  if (loadError) {
    // Si une erreur est survenue lors du chargement, on affiche un message d'erreur
    return (
      <div>Erreur de chargement de l'API Google Maps : {loadError.message}</div>
    );
  }

  // On vérifie si l'API Google Maps a été chargée avec succès
  if (!isLoaded) {
    // Si l'API n'est pas encore chargée, on affiche un message de chargement en cours
    return <div>Chargement de l'API Google Maps en cours...</div>;
  }

  function changeEmail(event) {
    const email = event.target.value;
    dispatch(updateEmail(email));
  }

  function changeLastname(event) {
    const lastname = event.target.value;
    dispatch(updateLastname(lastname));
  }

  function changeFirstname(event) {
    const firstname = event.target.value;
    dispatch(updateFirstname(firstname));
  }

  function changePhone(event) {
    const phone = event.target.value;
    dispatch(updatePhone(phone));
  }

  function changeStory(event) {
    const story = event.target.value;
    dispatch(updateStory(story));
  }

  function changeObjectEmail(event) {
    const objectEmail = event.target.value;
    dispatch(updateObjectEmail(objectEmail));
  }

  function submitContact(event) {
    event.preventDefault();

    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailFormat.test(email)) {
      // Afficher une notification indiquant que le format de l'email est incorrect
      toast.error("Le format de l'email n'est pas valide.", {
        position: 'bottom-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
      return;
    }
  
    // Vérifier la validité du formulaire
    if (!email || !story) {

      setShakeFields(true);
      // Afficher la notification Toastify si la validation échoue
      toast.error('Veuillez remplir tous les champs obligatoires.', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      return; // Arrêter l'exécution de la fonction si la validation échoue
    }

    setShakeFields(false);
    // Si le formulaire est valide, soumettez-le
    // Soumission réussie du formulaire
    toast.success('Votre message a bien été envoyé !', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    // Réinitialisation des champs du formulaire
    dispatch({ type: 'SUBMIT_CONTACT' });

    dispatch(updateFirstname(''));
    dispatch(updateLastname(''));
    dispatch(updateEmail(''));
    dispatch(updatePhone(''));
    dispatch(updateStory(''));
    dispatch(updateObjectEmail(''));

  }

  return (
    <div className="contact">
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      /> 
      <div>
        <div>Clé API Google Maps : {process.env.REACT_APP_GOOGLE_MAPS_API_KEY}</div>
      </div>
      <div className="contact_adress">
        <ul>
          <li className="tab">
            {artist.firstname} {artist.lastname}
          </li>
          <li><Mail /> {artist.email}</li>
          <li><Phone /> {artist.phone}</li>
          <li><Place />
            {artist.street_no} {artist.street_name}
          </li>
          <li className="tab">
            {artist.zipcode} {artist.city}
          </li>
          <br />
          <div className="contact_map">
            {isLoaded && center && (
              <GoogleMap
                className="google_map"
                mapContainerStyle={{
                  width: '100%',
                  height: '200px',
                }}
                center={center}
                zoom={10}
              >
                <Marker position={center} onClick={handleMarkerClick} />
                {infoWindowOpen && center && (
                  <InfoWindow
                    position={center}
                    onCloseClick={() => setInfoWindowOpen(false)}
                    options={{
                      maxWidth: 200,
                      pixelOffset: new window.google.maps.Size(0, -30),
                      className: 'custom-info-window',
                    }}
                  >
                    <div>
                      <h3>Adresse:</h3>
                      <p>
                        {artist.street_no} {artist.street_name},{' '}
                        {artist.zipcode} {artist.city}
                      </p>
                    </div>
                  </InfoWindow>
                )}
              </GoogleMap>
            )}
          </div>
        </ul>
      </div>
      <div className="contact_form">
        Formulaire de contact
        <form action="post" onSubmit={submitContact}>
          <input
            className="contact_form_input"
            type="text"
            name="firstname"
            id="firstname"
            placeholder="Prénom"
            value={firstname}
            onChange={changeFirstname}
          />

          <input
            className="contact_form_input"
            type="text"
            name="familyName"
            id="familyname"
            placeholder="Nom"
            value={lastname}
            onChange={changeLastname}
          />

          <input
            className="contact_form_input"
            type="tel"
            name="phone"
            id="phone"
            placeholder="Téléphone"
            value={phone}
            onChange={changePhone}
          />

          <input
            className={`contact_form_input ${!email && shakeFields && 'shake'}`}
            type="email"
            name="email"
            id="email"
            placeholder="Adresse email*"
            value={email}
            onChange={changeEmail}
          />

          <input
            className="contact_form_input"
            type="text"
            name="objectEmail"
            id="objectEmail"
            placeholder="Objet"
            value={objectEmail}
            onChange={changeObjectEmail}
          />

          <textarea
            className={`contact_form_input ${!story && shakeFields && 'shake'}`}
            id="story"
            name="story"
            rows="3"
            cols="20"
            placeholder="Message*"
            value={story}
            onChange={changeStory}
          ></textarea>
          
          <input
            className="contact_form_input validButton"
            type="submit"
            value="Valider"
            onClick={submitContact}
          />
        </form>
      </div>
    </div>
  );
}
