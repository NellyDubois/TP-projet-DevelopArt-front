import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import './Gallery.scss';
import { NavLink } from 'react-router-dom';
import Modal from '../Modal/Modal.jsx';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { updateDeleteId } from '../../store/artworkSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Gallery() {
  const dispatch = useDispatch();

  //au chargement de la page, on fait un appel au middleware qui appellera toutes les catégories, dans le but de toutes les récupérer pour boucler dessus pour les afficher :
  useEffect(() => {
    const actionCat = { type: 'ALL_CATEGORY' };
    dispatch(actionCat);

    const actionArt = { type: 'ARTWORK_BY_CATEGORY' };
    dispatch(actionArt);
  }, []);

  // ici on recupère le tableau de catégories pour que l'on puisse boucler dessus (ci-dessous, on créera un bouton pour chaque catégorie) :
  const category = useSelector((state) => state.category.list);
  console.log('le retour de category est ', category);

  // ici on appellera les artworks en fonction de ce qu'on a choisi (le artwork se remettra à jour en fonction de toutes les categories ou seulement d'une en particulier) :
  const artwork = useSelector((state) => state.artwork.list);
  console.log('le retour de artwork est', artwork);

  const artist = useSelector((state) => state.artist);

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  // ici, on fera appel au middleware qui retournera les détails concernant une seule oeuvre : displayDetailPicture se déclenchera lorsqu'on cliquera sur une image et recuperera l'ID de l'image en question pour pouvoir appeler les détails de l'oeuvre concernée :
  function displayDetailPicture(id) {
    const action = {
      type: 'RETURN_ARTWORK_DETAILS',
      id: id,
    };

    dispatch(action);
  }

  const [selectedCategory, setSelectedCategory] = useState('Toutes'); // cette fonction se déclenchera lorsque l'on cliquera sur le bouton catégorie désiré, ce même bouton renverra aussi l'id de la catégorie qu'on recuperera en paramètre :
  function showByCategory(targetCategory) {
    console.log('targetCategory', targetCategory);
    if (targetCategory === 'Toutes') {
      return artwork;
    }
    const found = artwork.filter((elem) =>
      elem.categories?.includes(targetCategory)
    );
    console.log('retour de found est ', found);
    return found;
    // const action = {
    //   type: 'ARTWORK_BY_CATEGORY',
    //   id: targetId,
    // };

    // dispatch(action);
  }

  // Cette fonction sera enclenchée lorsqu'on appuiera sur le bouton "toutes" qui permettra de ré afficher toutes les catégories en appelant le Artwork middleware mais sans filter quoi que ce soit (donc un appel global) :
  function triggerSetAll() {
    const action = { type: 'ARTWORK_GALLERY' };
    dispatch(action);

    //   const action = { type: 'ALL_CATEGORY' };
    //   dispatch(action);
  }

  // valeurs servant à gérer la modal, qui dépondront de l'oeuvre choisi et si la modal est ouverte ou non
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ici on gère l'ouverure de la modal avec l'oeuvre correspondante
  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  // ici on gère la fermeture de la modal en remettant les valeurs qui serve a la gérer à null pour l'oeuvre et a false pour l'ouverture de la modal
  const closeModal = () => {
    setSelectedArtwork(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    const action = { type: 'DELETE_ARTWORK' };
    dispatch(updateDeleteId(deleteId));
    dispatch(action);
    dispatch(updateDeleteId(''));
    handleClose();
    showNotification("L'image a bien été supprimée", 'success');
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    handleClickOpen();
  };

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
      onClose: () => {
        window.location.reload();
      },
    });
  }
  return (
    <div className="gallery">
      <h1 className="gallery_h1">
        GALERIE by {artist.firstname} {artist.lastname}
      </h1>

      <div className="gallery_grid">
        <div className="grid_img_categorie gradient">
          <ul>
            <span>CATEGORIES</span>
            <li>
              <button
                className="buttonCategory"
                onClick={() => setSelectedCategory('Toutes')}
              >
                Toutes
              </button>
            </li>
            {category.map((item) => (
              <li key={item.id}>
                <button
                  key={item.id}
                  className="buttonCategory"
                  onClick={() => setSelectedCategory(item.name)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {showByCategory(selectedCategory).map((item) => (
          <div className="grid_img" key={item.id} name={item.name}>
            <NavLink
              to={`/galerie/${item.id}`}
              onClick={() => displayDetailPicture(item.id)}
            >
              <img
                src={`${process.env.REACT_APP_BASE_URL_BACK}${item.path}}`}
                width="100%"
                alt={item.description}
                data-id={item.id}
              />
              {artist.logged && (
                <>
                  <button
                    type="button"
                    className="button_image"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation(); // Empêche la propagation de l'événement au parent
                      openModal(item);
                    }}
                  >
                    <FaPencilAlt className="icon" />
                  </button>
                  <button
                    type="button"
                    className="button_image_trash"
                    onClick={(event) => {
                      event.preventDefault();
                      event.stopPropagation(); // Empêche la propagation de l'événement au parent

                      handleDeleteClick(item.id);
                    }}
                  >
                    <FaTrash className="icon" />
                  </button>
                </>
              )}
            </NavLink>

            {/* <Route path="/galerie/:oeuvre" element={<Details />} /> */}
          </div>
        ))}

        {/* <div className="grid_img statue">
          {/* <img src="./images/statue.jpg" width="100% " alt=""/> */}
        {/* </div> */}
        {/* <div className="grid_img">
          {/* <img src="./images/voielactée.jpg" width="100%" alt=""/> */}
        {/* </div> */}
        {/* <div className="grid_img">
          {/* <img src="./images/mannequinAsiatDebout.jpg"  width="100%" alt=""/> */}
        {/* </div> */}
        {/* <div className="grid_img test">
          {/* <img src="./images/asiatfemme.jpg" width="100%" alt=""/> */}
        {/* </div> */}
        {/* // <div className="grid_img"> */}
        {/* <img src="./images/hommeClassique.jpg" width="100%"  alt=""/> */}
        {/* // </div> */}
        {/* // <div className="grid_img tutu"> */}
        {/* <img src="./images/classiqueFemmeRose.jpg" width="100%" alt=""/> */}
        {/* // </div>  */}
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
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Confirmation de suppression'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir supprimer l'image ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete}>Oui</Button>
            <Button onClick={handleClose} autoFocus>
              Non
            </Button>
          </DialogActions>
        </Dialog>
        {isModalOpen && (
          <Modal artwork={selectedArtwork} onClose={closeModal} />
        )}
      </div>
    </div>
  );
}
