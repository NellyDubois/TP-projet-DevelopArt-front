// Home.jsx est un composant React qui constitue la page d'accueil de Develop'Art
// Le composant Home récupère des données depuis le store Redux à l'aide de useSelector pour les artistes et les œuvres d'art à afficher sur la page d'accueil.
// Il utilise useState pour gérer l'état local du composant, notamment pour contrôler l'ouverture/fermeture du modal et de la boîte de dialogue.
// Le composant rend une structure de page HTML contenant des éléments tels que le titre de l'artiste, sa biographie, les œuvres d'art à afficher, ainsi que des boutons d'édition et de suppression pour les utilisateurs connectés.
// Il utilise des composants et des fonctions importés pour gérer l'affichage des détails des œuvres d'art dans un modal, ainsi que pour afficher des notifications à l'utilisateur.

// Import des fonctions useState et useSelector depuis la bibliothèqure react-redux, utilsées pour la gestion des états et des données du store Redux
import { useDispatch, useSelector } from 'react-redux';
// Import du fichier de style SCSS associé
import './Home.scss';
// Importe du composant Modal pour afficher le modal de modification d'une oeuvre
import Modal from '../Modal/Modal.jsx';
// Import de la fonction useState depuis la bibliothèque react, utilisée pour gérer l'état local du composant
import { useState } from 'react';
// Import de la fonction NavLink depuis la bibliothèque react-router-dom, utilisée pour la navigation entre les différentes pages de l'application
import { NavLink } from 'react-router-dom';
// Import des icônes de crayon et poubelle depuis la bibliothèque react-icons/fa
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; 
// Import de la fonction updateDeleteId depuis le fichier artworkSlice du store Redux, utilisée pour mettre à jour l'identifiant de l'oeuvre à supprimer
import { updateDeleteId } from '../../store/artworkSlice';

// Import du composant Dialog de Material-UI, utilisé pour afficher une boîte de dialogue de confirmation lorsque l'utilisateur souhaite surpprimer une oeuvre
import Dialog from '@mui/material/Dialog';
// Import du composant DialogActions de Material-UI, utilisé pour afficher les actions disponibles dans une boîte de dialogue.
import DialogActions from '@mui/material/DialogActions';
// Import du composant DialogContent de Material-UI, utilisé pour afficher le contenu d'une boîte de dialogue.
import DialogContent from '@mui/material/DialogContent';
// Import du composant DialogContentText de Material-UI, utilisé pour afficher du texte dans une boîte de dialogue.
import DialogContentText from '@mui/material/DialogContentText';
// Import du composant DialogTitle de Material-UI, utilisé pour afficher le titre d'une boîte de dialogue.
import DialogTitle from '@mui/material/DialogTitle';
// Import du composant Button de Material-UI, utilisé pour afficher des boutons dans l'interface utilisateur.
import Button from '@mui/material/Button';

// Import de la fonction toast et du composant ToastContainer depuis la bibliothèque react-toastify, utilisés pour afficher des notifications à l'utilisateur
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Définition du comportement et de l'apparence de la page d'accueil de Develop'Art, en intégrant des fonctionnalités de manipulation d'état, de navigation, d'affichage des détails des œuvres d'art, et de gestion des notifications utilisateur.
export default function Home() {
  // Utilise le hook useSelector pour extraire les données de l'artiste depuis le store Redux global.
  // Le hook useSelector permet d'accéder à l'état du store Redux dans un composant fonctionnel de React.
  const artist = useSelector((state) => state.artist);
  // Utilise le hook useSelector pour extraire la liste des œuvres d'art depuis le store Redux global.
  const artworkHomepage = useSelector((state) => state.artworkHomepage.list);
  // Obtient la fonction dispatch pour envoyer des actions au store Redux.
  // Le dispatch est une fonction fournie par le store Redux qui permet de déclencher des actions pour mettre à jour l'état du store.
  const dispatch = useDispatch();

  // Déclare des variables locales pour suivre l'état de la sélection d'une œuvre d'art, l'état d'ouverture du modal, l'état du modal de confirmation de suppression, et l'ID de l'œuvre d'art à supprimer, respectivement.
  // useState est un hook de React qui permet de gérer l'état local d'un composant fonctionnel.
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  // Fonction pour ouvrir le modal de détails de l'œuvre d'art en définissant l'œuvre d'art sélectionnée et en mettant isModalOpen à true.
  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // Fonction pour fermer le modal de détails de l'œuvre d'art en réinitialisant l'œuvre d'art sélectionnée et en mettant isModalOpen à false.
  const closeModal = () => {
    setSelectedArtwork(null);
    setIsModalOpen(false);
  };

  // Fonction appelée lorsque l'utilisateur confirme la suppression d'une œuvre d'art. Elle envoie une action Redux pour supprimer l'œuvre d'art sélectionnée, puis ferme le modal de confirmation et affiche une notification de confirmation.
  const handleDelete = () => {
    const action = { type: 'DELETE_ARTWORK'}
    dispatch(updateDeleteId(deleteId));
    dispatch(action);
    dispatch(updateDeleteId(''));
    handleClose();
    showNotification("L'image a bien été supprimée", 'success');
  }
  // Fonction pour ouvrir le modal de confirmation de suppression en mettant open à true.
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Fonction pour fermer le modal de confirmation en mettant open à false.
  const handleClose = () => {
    setOpen(false);
  };
  // Fonction appelée lorsque l'utilisateur clique sur le bouton de suppression d'une œuvre d'art. Elle définit l'ID de l'œuvre d'art à supprimer, puis ouvre le modal de confirmation.
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    handleClickOpen();
  };

  // Fonction pour envoyer une action Redux afin d'afficher les détails d'une œuvre d'art spécifique.
  function displayDetailPicture(id) {
    const action = {
      type: 'RETURN_ARTWORK_DETAILS',
      id: id,
    };
    dispatch(action);
  }
  // Fonction pour afficher une notification à l'utilisateur.
  function showNotification(message, type = 'info') {
    toast[type](message, {
      position: 'bottom-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });
  }
  // Rendu de la structure de la page d'accueil avec affichage des informations sur l'artiste et des œuvres d'art, gestion des modals et des notifications.
  return (
    <main>
      {/* Section pour la présentation de l'artiste */}
      <section className="containerArtiste">
        <header className="container_titreImgArtisteTexte">
          <h1 className="container_titreImgArtisteTexte_h1">
            GALERIE D'ART D'{artist.firstname} {artist.lastname}
          </h1>

          <div className="container_titreImgArtiste_imgEtPresa">
            <div className="container_titreImgArtiste_img">
              <img src={`${process.env.REACT_APP_BASE_URL_BACK}${artist.path}`} alt={`Photo de l'artiste ${artist.firstname} ${artist.lastname}`} />
            </div>
            <p className="container_titreImgArtiste_presa">{artist.biography}</p>
          </div>
        </header>
        
        {/* Section avec les 3 oeuvres de l'artiste pour la page d'accueil */}
        <section className="container_presa_oeuvres">
          {/* Si le tableau artworkHomepage contient des éléments, on boucle sur chaque élément pour afficher les images des oeuvres d'art de l'artiste. */}
          {
            artworkHomepage.length > 0 && artworkHomepage.map((item) => (
              // Pour chaque oeuvre, on crée un élément article avec la classe container_photo et une clé unique correspondant à l'identifiant de l'oeuvre.
              <article className="container_photo" key={item.id}>
                <NavLink
                // lien qui, lorsqu'il est cliqué redirige vers la page de détails de l'oeuvre et appelle la fonction displayDetailPicture
                    to={`/galerie/${item.id}`}
                    onClick={() => displayDetailPicture(item.id)}
                >
                  <img src={`${process.env.REACT_APP_BASE_URL_BACK}${item.path}`} 
                  alt={`Oeuvre de ${artist.firstname} ${artist.lastname} : ${item.description}`} 
                  />
                  {/* Si l'artiste est connecté, on affiche les boutons de modification et de suppression de l'oeuvre.Chaque bouton a un gestionnaire d'événements qui est déclenché lorsque le bouton est cliqué. Le premier ouvre une modal pour modifier l'oeuvre et le second appelle la fonction handleDeleteClick avec l'id de l'oeuvre pour la supprimer */}
                  {artist.logged && (
                    <>
                      <button type="button" className='button_image' onClick={(event) => {
                          event.preventDefault();
                          // permet de limiter l'impact d'un événement sur les éléments parents et de restreindre son effet au seul élément sur lequel l'événement a été déclenché.
                          event.stopPropagation();
                          openModal(item);
                        }} 
                        aria-label="Modifier l'oeuvre" 
                      >
                        <FaPencilAlt className="icon" />
                      </button>
                      <button type="button" className='button_image_trash' onClick={(event) => {
                          event.preventDefault();
                          event.stopPropagation();                    
                          handleDeleteClick(item.id)}} aria-label="Supprimer l'oeuvre" >
                          <FaTrash className="icon" />
                      </button>
                    </>
                  )}
                </NavLink>
              </article>
            ))
          }
        </section>

        {/* Composant de la bibliothèque react-toastify pour afficher des notifications à l'utilisateur.*/}
        <ToastContainer
          position="bottom-center" //notifications en bas de l'écran
          autoClose={5000}         //notifications disparaissent après 5 secondes
          hideProgressBar={false}  //avec l'affichage d'une barre de progression
          newestOnTop={false}      //les nouvelles notifications apparaissent en dessous des anciennes
          closeOnClick             //fermeture de la notification au clic
          rtl={false}              //texte de gauche à droite
          pauseOnFocusLoss         //pause de la notification lors de la perte de focus
          draggable               //déplacement de la notification
          pauseOnHover          //pause de la notification au survol  
          theme="dark"          //thème sombre
        />

        {/*Composant Dialog de la bibliothèque Material-UI pour afficher une boîte de dialogue de confirmation de suppression d'une oeuvre d'art.*/}
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation de suppression"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir supprimer l'image ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} aria-label="Confirmer la suppression">Oui</Button>
            <Button onClick={handleClose} autoFocus aria-label="Annuler la suppression">
              Non
            </Button>
          </DialogActions>
        </Dialog>
        {/* si isModalOpen est évalué à true, alors l'expression <Modal artwork={selectedArtwork} onClose={closeModal} /> sera rendue dans le DOM. Sinon, si isModalOpen est évalué à false, alors rien ne sera rendu à cet endroit dans le DOM. */}
        {isModalOpen && <Modal artwork={selectedArtwork} onClose={closeModal} />}
      </section>
    </main>
  );
}