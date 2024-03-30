// Importation des hooks et des composants nécessaires
import { useEffect, useState } from 'react'; // Hooks de React
import { useDispatch, useSelector } from 'react-redux'; // Hooks de Redux
import { toast, ToastContainer } from 'react-toastify'; // Composants pour les notifications
import 'react-toastify/dist/ReactToastify.css'; // Styles pour les notifications
import { Place, Phone, Mail } from '@mui/icons-material'; // Icônes de Material-UI

import './Contact.scss'; // Styles spécifiques à ce composant

// Importation des composants pour Google Maps
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

// Importation des actions pour mettre à jour l'état du formulaire de contact
import {
  updateEmail,
  updateFirstname,
  updateLastname,
  updatePhone,
  updateStory,
  updateObjectEmail,
} from '../../store/contactSlice';

// Définition du composant Contact
export default function Contact() {
  // Utilisation du hook useDispatch pour envoyer des actions au store Redux
  const dispatch = useDispatch();

  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  // On récupère les informations de l'artiste et les valeurs des champs du formulaire de contact
  const artist = useSelector((state) => state.artist);
  const email = useSelector((state) => state.contact.email);
  const lastname = useSelector((state) => state.contact.lastname);
  const story = useSelector((state) => state.contact.story);
  const phone = useSelector((state) => state.contact.phone);
  const firstname = useSelector((state) => state.contact.firstname);
  const objectEmail = useSelector((state) => state.contact.objectEmail);

  // Utilisation du hook useState pour gérer l'état local du composant
  // On crée une variable d'état pour savoir si on doit secouer les champs du formulaire
  const [shakeFields, setShakeFields] = useState(false);

  // Utilisation de useJsApiLoader pour gérer le chargement de l'API Google Maps
  // On récupère la clé API de Google Maps depuis les variables d'environnement
  const { isLoaded, loadError } = useJsApiLoader({
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
  // Le géocodage est effectué lorsque l'artiste et l'API Google Maps sont chargés
  useEffect(() => {
    if (artist && isLoaded) {
      // Construction de l'adresse de l'artiste
      const address = `${artist.street_no} ${artist.street_name}, ${artist.zipcode} ${artist.city}`;

      // Création d'un géocodeur pour convertir l'adresse en coordonnées géographiques
      const geocoder = new window.google.maps.Geocoder();

      // Géocodage de l'adresse
      geocoder.geocode({ address: address }, (results, status) => {
        // Si le géocodage a réussi, on met à jour le centre de la carte avec les coordonnées obtenues
        if (status === 'OK' && results[0]) {
          const { lat, lng } = results[0].geometry.location;
          setCenter({ lat: lat(), lng: lng() });
        } else {
          // Si le géocodage a échoué, on affiche un message d'erreur dans la console
          console.error('Le géocodage a échoué avec le status :', status);
        }
      });
    }
  }, [artist, isLoaded]);

  // Gestion des erreurs de chargement de l'API Google Maps
  if (loadError) {
    return <div>Erreur de chargement de l'API Google Maps : {loadError.message}</div>;
  }
  if (!isLoaded) {
    return <div>Chargement de l'API Google Maps en cours...</div>;
  }

  // Fonctions pour gérer les changements dans les champs du formulaire
  // Chaque fonction met à jour l'état correspondant dans le store Redux
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

  // Fonction pour gérer la soumission du formulaire
  function submitContact(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    // Vérification du format de l'email
    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email && !emailFormat.test(email)) {
      // Si l'email n'est pas valide, on affiche une notification d'erreur
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

    // Vérification de la présence des champs obligatoires
    if (!email || !story) {
      // Si les champs obligatoires ne sont pas remplis, on secoue les champs et on affiche une notification d'erreur
      setShakeFields(true);
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
      return;
    }

    // Si le formulaire est valide, on arrête de secouer les champs et on affiche une notification de succès
    setShakeFields(false);
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

    // On envoie une action pour soumettre le formulaire et on réinitialise les champs
    dispatch({ type: 'SUBMIT_CONTACT' });
    dispatch(updateFirstname(''));
    dispatch(updateLastname(''));
    dispatch(updateEmail(''));
    dispatch(updatePhone(''));
    dispatch(updateStory(''));
    dispatch(updateObjectEmail(''));
  }

  // Rendu du composant
  return (
    // Le composant principal est une balise <main> avec la classe "contact"
    <main className="contact">
      <h1 className="contact_title">Contactez-nous</h1>
  
      {/* Utilisé pour afficher des notifications à l'utilisateur */}
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
  
      {/* contient les informations de contact et le formulaire de contact */}
      <div className="contact_sections">
        <section className="contact_adress">
          <ul>
            <li className="li-logo tab"><Mail /> {artist.email}</li>
            <li className="li-logo tab"><Phone /> {artist.phone}</li>
            <li className="tab"> {artist.firstname} {artist.lastname}</li>
            <li className="li-logo tab"><Place />{artist.street_no} {artist.street_name}</li>
            <li className="tab">{artist.zipcode} {artist.city}</li>
            <br />

            {/* La carte Google Maps est affichée si l'API Google Maps est chargée et si le centre de la carte est défini */}
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
                  {/*  Un marqueur est placé au centre de la carte
                  Lorsqu'on clique sur le marqueur, une infobulle s'ouvre avec l'adresse de l'artiste */}
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
        </section>
  
        {/* Formulaire de contact 
            Chaque champ du formulaire est associé à une valeur de l'état du composant
            Lorsque la valeur du champ change, la fonction correspondante est appelée pour mettre à jour l'état */}
        <section className="contact_form">
          <h2>Formulaire de contact</h2>         
          <form action="post" onSubmit={submitContact}>
            <label htmlFor="firstname">Prénom</label>
            <input
              className="contact_form_input"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="Prénom"
              value={firstname}
              onChange={changeFirstname}
            />
  
            <label htmlFor="familyname">Nom</label>
            <input
              className="contact_form_input"
              type="text"
              name="familyName"
              id="familyname"
              placeholder="Nom"
              value={lastname}
              onChange={changeLastname}
            />
  
            <label htmlFor="phone">Téléphone</label>
            <input
              className="contact_form_input"
              type="tel"
              name="phone"
              id="phone"
              placeholder="Téléphone"
              value={phone}
              onChange={changePhone}
            />
  
            <label htmlFor="email">Adresse email*</label>
            <input
              className={`contact_form_input ${!email && shakeFields && 'shake'}`}
              type="email"
              name="email"
              id="email"
              placeholder="Adresse email*"
              value={email}
              onChange={changeEmail}
              aria-required="true"
            />
  
            <label htmlFor="objectEmail">Objet</label>  
            <input
              className="contact_form_input"
              type="text"
              name="objectEmail"
              id="objectEmail"
              placeholder="Objet"
              value={objectEmail}
              onChange={changeObjectEmail}
            />
  
            <label htmlFor="story">Message*</label>
            <textarea
              className={`contact_form_input ${!story && shakeFields && 'shake'}`}
              id="story"
              name="story"
              rows="3"
              cols="20"
              placeholder="Message*"
              value={story}
              onChange={changeStory}
              aria-required="true"
            ></textarea>
            
            <input
              className="contact_form_input validButton"
              type="submit"
              value="Valider"
              onClick={submitContact}
            />
          </form>
        </section>        
      </div>
    </main>
  );
}