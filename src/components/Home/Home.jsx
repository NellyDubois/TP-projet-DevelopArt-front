import { useDispatch, useSelector } from 'react-redux';
import './Home.scss';
import Modal from '../Modal/Modal.jsx';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPencilAlt, FaTrash } from 'react-icons/fa'; // Import de l'icône de crayon et poubelle
import { updateDeleteId } from '../../store/artworkSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {
  const artist = useSelector((state) => state.artist);
  const artworkHomepage = useSelector((state) => state.artworkHomepage.list);
  const dispatch = useDispatch();
  

  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const openModal = (artwork) => {
    setSelectedArtwork(artwork);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedArtwork(null);
    setIsModalOpen(false);
  };

  const handleDelete = () => {
      const action = { type: 'DELETE_ARTWORK'}
      dispatch(updateDeleteId(deleteId));
      dispatch(action);
      dispatch(updateDeleteId(''));
      handleClose();
      showNotification("L'image a bien été supprimée", 'success');
  }
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

  function displayDetailPicture(id) {
    const action = {
      type: 'RETURN_ARTWORK_DETAILS',
      id: id,
    };

    dispatch(action);
  }

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
  return (
    <main>
      <div className="containerArtiste">
        <div className="container_titreImgArtisteTexte">
          <h1 className="container_titreImgArtisteTexte_h1">
            ART PICTURES BY {artist.firstname} {artist.lastname}
          </h1>

          <div className="container_titreImgArtiste_imgEtPresa">
            <div className="container_titreImgArtiste_img">
              <img src={`${process.env.REACT_APP_BASE_URL_BACK}${artist.path}`} alt="Photo de l'artiste" />
            </div>
            <p className="container_titreImgArtiste_presa">{artist.biography}</p>
          </div>
        </div>

        <div className="container_presa_oeuvres">
         { artworkHomepage.length > 0 && artworkHomepage.map((item) => (
          <div className="container_photo" key={item.id}>
          <NavLink
              to={`/galerie/${item.id}`}
              onClick={() => displayDetailPicture(item.id)}
            >
          <img src={`${process.env.REACT_APP_BASE_URL_BACK}${item.path}`} alt={item.description} />
            {artist.logged && (
              <>
              <button type="button" className='button_image' onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    openModal(item);
                  }} >
                <FaPencilAlt className="icon" />
              </button>
              <button type="button" className='button_image_trash' onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    
                    handleDeleteClick(item.id)}} >
                    <FaTrash className="icon" />
                  </button>
                  </>
            )}
            </NavLink>
          </div>
         ))}
        </div>
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
          <DialogTitle id="alert-dialog-title">{"Confirmation de suppression"}</DialogTitle>
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
        {isModalOpen && <Modal artwork={selectedArtwork} onClose={closeModal} />}
      </div>
    </main>
  );
}