/* Le composant Gallery.jsx utilise le useSelector pour extraire les données des oeuvres d'art depuis le store Redux, et il les affiche ensuite dans l'interface utilisateur en fonction de ces données. Lorsque le composant Gallery est monté, il déclenche l'action 'ARTWORK_BY_CATEGORY' qui est interceptée par le middleware artworkByCategoryMiddleware, déclenchant ainsi la récupération des données des oeuvres d'art depuis l'API backend. Une fois les données récupérées et mises à jour dans le store Redux, le composant Gallery est mis à jour pour afficher les nouvelles données.*/

/* Import des hooks useSelector et useDispatch depuis la bibliothèque react-redux, permettant au composant d'accéder au store Redux et de dispatcher des actions.*/
import { useSelector, useDispatch } from 'react-redux';
/* Imports permettant l'utilisation des hooks useEffect et useState de React pour gérer les effets de bord et l'état local du composant.*/
import { useEffect, useState } from 'react';

/* Import des styles spécifiques pour le composant Gallery.*/
import './Gallery.scss';

/* Import du composant NavLink depuis la bibliothèque react-router-dom pour gérer la navigation entre les différentes pages de l'application.*/
import { NavLink } from 'react-router-dom';

/* Import du composant Modal depuis le fichier Modal.jsx pour afficher les détails d'une oeuvre d'art dans une fenêtre modale.*/
import Modal from '../Modal/Modal.jsx';

/* Import des icônes d'édition et de suppression depuis la bibliothèque d'icônes FontAwesome*/
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

/*Import de l'action updateDeleteId depuis le fichier artworkSlice dans le store Redux*/
import { updateDeleteId } from '../../store/artworkSlice';

/* Import des composants Dialog, DialogActions, DialogContent, DialogContentText et DialogTitle depuis la bibliothèque Material-UI pour afficher une boîte de dialogue de confirmation de suppression.*/
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

/* Import des composants toast et ToastContainer depuis la bibliothèque react-toastify pour afficher des notifications à l'utilisateur.*/
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* Définition du composant Gallery comme fonction */
export default function Gallery() {
  /* Utilisation du hook useDispatch pour récupérer la fonction dispatch permettant de dispatcher des actions vers le store Redux.*/
  const dispatch = useDispatch();
  
  /*useEffect est un hook de gestion des effets. Il indique que le code à l'intérieur de la fonction fléchée sera exécuté chaque fois que le composant est monté(=ajouté au DOM) (lors de son premier rendu) et à chaque fois que les dépendances, passées en deuxième argument (ici un tableau vide []), changent. Dans ce cas, étant donné que le tableau de dépendances est vide, cela signifie que le code à l'intérieur de useEffect ne sera exécuté qu'une seule fois après le rendu initial du composant.*/
  useEffect(() => {
    /*crée une action Redux avec le type 'ALL_CATEGORY', indiquant une action qui déclenche categoryMiddleware pour récupérer toutes les catégories disponibles. Cette action sera envoyée au store Redux pour déclencher une mise à jour des catégories dans l'application.*/
    const actionCat = { type: 'ALL_CATEGORY' };
    dispatch(actionCat);

    /*crée une autre action Redux avec le type 'ARTWORK_BY_CATEGORY'pour récupérer des oeuvres d'art en fonction de leur catégorie. Tout comme l'action précédente, cette action sera également envoyée au store Redux pour déclencher une mise à jour des données des oeuvres d'art.*/
    const actionArt = { type: 'ARTWORK_BY_CATEGORY' };
    dispatch(actionArt); /*envoie l'action actionArt au store Redux en utilisant la fonction dispatch. Cela déclenchera également une mise à jour des données des oeuvres d'art dans le store Redux, ce qui pourrait entraîner une mise à jour de l'interface utilisateur si des composants écoutent ces changements de données.*/
  }, []); /*[] comme tableau de dépendances dans useEffect indique que l'effet doit être exécuté une seule fois après le montage initial du composant, et il ne sera pas réexécuté à moins que le composant ne soit démonté puis remonté.*/

  // Récupération du tableau de catégories depuis le store Redux en utilisant le hook useSelector. Ce tableau sera utilisé pour afficher les différentes catégories dans l'interface utilisateur.
  const category = useSelector((state) => state.category.list);
 
  // Utilisation du hook useSelector pour extraire la liste des oeuvres d'art du store Redux
  const artwork = useSelector((state) => state.artwork.list);

  // Utilisation du hook useSelector pour extraire les données de l'artiste du store Redux.
  const artist = useSelector((state) => state.artist);

  // Utilisation du hook useState pour gérer l'état local de la modal (ouverte ou fermée) et de l'oeuvre sélectionnée.
  // Open est une variable qui stocke l'état local, initailisé à false donc modale fermée
  // setOpen est une fonction qui permet de modifier la valeur de open.
  const [open, setOpen] = useState(false);
  // deleteId est une chaîne de caractères qui contient l'identifiant de l'oeuvre à supprimer.
  // setDeleteId est une fonction de mise à jour de l'état qui permet de modifier la valeur de deleteId.
  const [deleteId, setDeleteId] = useState('');

  /*Crée une action Redux avec le type 'RETURN_ARTWORK_DETAILS' et l'identifiant de l'oeuvre d'art sélectionnée. Cette action sera envoyée (dispatch) au store Redux pour déclencher la récupération des détails de l'oeuvre d'art sélectionnée avec le middelware detailsMiddleware.js.displayDetailPicture se déclenchera lorsqu'on cliquera sur une image et recuperera l'ID de l'image en question pour pouvoir appeler les détails de l'oeuvre concernée :*/
  function displayDetailPicture(id) {
    const action = {
      type: 'RETURN_ARTWORK_DETAILS',
      id: id,
    };
    dispatch(action);
  }

  // déclare une variable d'état selectedCategory qui est initialement définie sur 'Toutes' et une fonction setSelectedCategory pour mettre à jour cette variable d'état. Elle utilise le hook useState de React.
  const [selectedCategory, setSelectedCategory] = useState('Toutes'); 
  
  // Cette fonction se déclenchera lorsque l'on cliquera sur le bouton catégorie désiré, ce même bouton renverra aussi l'id de la catégorie qu'on recupèrera en paramètre. Si la catégorie cible est 'Toutes', elle retourne toutes les œuvres d'art disponibles. Sinon, elle filtre les œuvres d'art pour ne retourner que celles qui appartiennent à la catégorie cible. 
  function showByCategory(targetCategory) {
    if (targetCategory === 'Toutes') {
      return artwork;
    }
    /*filter crée un nouveau tableau avec uniquement les éléments répondant à la condition "la propriété categories de l'élément (œuvre d'art) contient la catégorie cible (targetCategory)". La syntaxe ?. est utilisée pour accéder à la propriété categories de manière sécurisée, ce qui signifie que si categories est null ou undefined, l'expression entière retournera false*/
    const found = artwork.filter((elem) =>
      elem.categories?.includes(targetCategory)
    );
    return found;
  }

  /* déclare deux variables d'état selectedArtwork et isModalOpen à l'aide du hook useState de React. selectedArtwork est initialement défini sur null et isModalOpen est initialement défini sur false. Ces variables d'état sont utilisées pour gérer l'ouverture et la fermeture de la modal affichant les détails de l'oeuvre d'art sélectionnée. setSelectedArtowrk et setIsModalOpen sont des fonctions de mise à jour de l'état qui permettent de modifier les valeurs de ces variables d'état.*/
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fonction openModal est appelée lorsque l'utilisateur souhaite ouvrir la fenêtre modale pour afficher les détails d'une œuvre d'art spécifique.
  const openModal = (artwork) => {
    setSelectedArtwork(artwork); /*met à jour l'état selectedArtwork avec l'œuvre d'art sélectionnée, ce qui permet à la fenêtre modale d'accéder à ces détails et de les afficher.*/
    setIsModalOpen(true); /*met à jour l'état isModalOpen à true, ce qui déclenche l'ouverture de la fenêtre modale.*/
  };

  // fonction closeModal est appelée lorsque l'utilisateur souhaite fermer la fenêtre modale.
  const closeModal = () => {
    setSelectedArtwork(null); /* réinitialise l'état selectedArtwork à null, ce qui efface les détails de l'œuvre d'art précédemment sélectionnée.*/
    setIsModalOpen(false); /*met à jour l'état isModalOpen à false, ce qui déclenche la fermeture de la fenêtre modale.*/
  };

  // Fonction handleDelete est appelée lorsque l'utilisateur confirme la suppression d'une œuvre d'art.
  const handleDelete = () => {
    // Crée une action Redux de type 'DELETE_ARTWORK' pour signaler la suppression d'une œuvre d'art.
    const action = { type: 'DELETE_ARTWORK' };
    // Met à jour l'ID de l'œuvre d'art à supprimer dans le store Redux en utilisant la fonction updateDeleteId.
    dispatch(updateDeleteId(deleteId));
    // Dispatch l'action DELETE_ARTWORK pour supprimer l'œuvre d'art du store Redux.
    dispatch(action);
    // Réinitialise l'ID de l'œuvre d'art à supprimer après la suppression.
    dispatch(updateDeleteId(''));
    // Ferme la fenêtre modale de confirmation de suppression.
    handleClose();
    // Affiche une notification indiquant que l'image a été supprimée avec succès.
    showNotification("L'image a bien été supprimée", 'success');
  };

  const handleClickOpen = () => {
    // Ouvre la fenêtre modale de confirmation de suppression en mettant à jour l'état 'open' à true.
    setOpen(true);
  };
  
  const handleClose = () => {
    // Ferme la fenêtre modale de confirmation de suppression en mettant à jour l'état 'open' à false.
    setOpen(false);
  };
  
  const handleDeleteClick = (id) => {
    // Stocke l'ID de l'œuvre d'art à supprimer dans l'état 'deleteId'.
    setDeleteId(id);
    // Ouvre la fenêtre modale de confirmation de suppression.
    handleClickOpen();
  };

  function showNotification(message, type = 'info') {
    // Affiche une notification en utilisant la bibliothèque react-toastify.
    // Le type de notification (info, success, error, etc.) est déterminé par l'utilisateur. Par défaut, c'est 'info'.
    // Le message à afficher est spécifié par l'utilisateur.
    toast[type](message, {
      // Position de la notification à l'écran.
      position: 'bottom-center',
      // Durée pendant laquelle la notification reste visible, en millisecondes.
      autoClose: 5000,
      // Affiche ou masque la barre de progression.
      hideProgressBar: false,
      // Ferme la notification lorsqu'elle est cliquée.
      closeOnClick: true,
      // Met en pause la fermeture automatique de la notification lorsqu'elle est survolée.
      pauseOnHover: true,
      // Permet à l'utilisateur de faire glisser la notification.
      draggable: true,
      // Configuration spécifique de la barre de progression de la notification.
      progress: undefined,
      // Thème de la notification (clair ou sombre).
      theme: 'dark',
      // Fonction exécutée lorsque la notification est fermée.
      onClose: () => {
        // Recharge la page après la fermeture de la notification.
        window.location.reload();
      },
    });
  }
 
 // Parcourir la liste 'category'
 category.forEach((item) => {
  // Vérifier si l'id de l'élément est 12
  if (item.id === 12) {
    // Afficher l'élément
    console.log(item);
  }
});

// Parcourir la liste 'showByCategory(selectedCategory)'
showByCategory(selectedCategory).forEach((item) => {
  // Vérifier si l'id de l'élément est 12
  if (item.id === 12) {
    // Afficher l'élément
    console.log(item);
  }
});

  /*Rendu du composant Gallery: Elle renvoie une structure HTML JSX qui affiche la galerie d'art*/
  return (
    <main className="gallery" aria-label={`Galerie de ${artist.firstname} ${artist.lastname}`}>
      {/* Titre de la galerie */}
      <h1 className="gallery_h1">
        Œuvres d'{artist.firstname} {artist.lastname}
      </h1>

      {/* Navigation de la galerie : liste des catégories d'œuvres d'art et les œuvres d'art correspondantes */}
      <nav className="gallery_grid">
        {/* Section des catégories */}
        <div className="grid_img_categorie gradient">
          <ul>
            <span>CATEGORIES</span>
            {/* Bouton pour afficher toutes les catégories */}
            <li>
              <button
                className="buttonCategory"
                onClick={() => setSelectedCategory('Toutes')} // Lorsque l'utilisateur clique sur le bouton, la catégorie sélectionnée est mise à jour avec la valeur 'Toutes'.
              >
                Toutes
              </button>
            </li>
            {/* Affichage des boutons pour chaque catégorie */}
            {category.map((item) => (
              <li key={item.id}>
                <button
                  // key={item.id}
                  className="buttonCategory"
                  onClick={() => setSelectedCategory(item.name)} // Lorsque l'utilisateur clique sur le bouton, la catégorie sélectionnée est mise à jour avec la valeur de la catégorie.
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
        {/* Affichage des œuvres d'art en fonction de la catégorie sélectionnée */}
        {showByCategory(selectedCategory).map((item) => (
          <article className="grid_img" key={item.id} name={item.name}>
            {/* lien vers la page de détail de l'œuvre d'art */}
            <NavLink
              to={`/galerie/${item.id}`} // Lorsque l'utilisateur clique sur l'œuvre d'art, il est redirigé vers la page de détail de l'œuvre d'art.
              onClick={() => displayDetailPicture(item.id)} // Lorsque l'utilisateur clique sur l'œuvre d'art, les détails de l'œuvre d'art sont récupérés et affichés.
            >
              {/* Image de l'œuvre d'art */}
              <img
                src={`${process.env.REACT_APP_BASE_URL_BACK}${item.path}`}
                width="100%"
                alt={item.description}
                data-id={item.id}
              />
              {/* Boutons pour modifier ou supprimer l'œuvre d'art */}
              {artist.logged && ( // Si l'artiste est connecté (valeur récupérée via la propriété logged de l'objet artist stocké dans le store Redux et récupéré via useSelector), les boutons de modification et de suppression de l'œuvre d'art sont affichés.
                <>
                  {/* Bouton pour modifier l'œuvre d'art */}
                  <button
                    type="button"
                    className="button_image"
                    onClick={(event) => { // Lorsque l'utilisateur clique sur le bouton de modification, la modal pour modifier l'œuvre d'art est ouverte.
                      event.preventDefault(); // Empêche le comportement par défaut du navigateur de rechargement de la page
                      event.stopPropagation(); // Empêche la propagation de l'événement au parent
                      openModal(item); // Ouvre la modal pour modifier l'œuvre d'art
                    }}
                    aria-label="Modifier l'oeuvre"
                  >
                  {/* Icône de modification */}
                    <FaPencilAlt className="icon" /> 
                  </button>

                  {/* Bouton pour supprimer l'œuvre d'art */}
                  <button
                    type="button"
                    className="button_image_trash"
                    onClick={(event) => {  // Lorsque l'utilisateur clique sur le bouton de suppression, la modal de confirmation de suppression est ouverte.
                      event.preventDefault(); // Empêche le comportement par défaut du navigateur de rechargement de la page
                      event.stopPropagation(); // Empêche la propagation de l'événement au parent
                      handleDeleteClick(item.id); // Ouvre la modal de confirmation de suppression
                    }}
                    aria-label="Supprimer l'oeuvre"
                  >
                  {/* Icône de suppression */}
                    <FaTrash className="icon" />
                  </button>
                </>
              )}
            </NavLink>
          </article>
        ))}
       
        {/* Conteneur pour les notifications */}
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
        {/* Fenêtre modale pour confirmer la suppression */}
        <Dialog
          open={open} // L'état 'open' détermine si la fenêtre modale est ouverte ou fermée.
          onClose={handleClose} // Lorsque l'utilisateur clique sur le bouton de fermeture de la fenêtre modale, la fonction handleClose est appelée pour fermer la fenêtre modale.
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
         {/* Contenu de la fenêtre modale de confirmation de suppression  */}
          <DialogTitle id="alert-dialog-title"> 
            {'Confirmation de suppression'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Êtes-vous sûr de vouloir supprimer l'image ?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} aria-label="Confirmer la suppression">Oui</Button> 
            <Button onClick={handleClose} autoFocus aria-label="Annuler la suppression">Non</Button>
          </DialogActions>
        </Dialog>

        {/* Composant modal pour afficher les détails de l'œuvre d'art */}
        {isModalOpen && ( // Si l'état isModalOpen est true, la fenêtre modale pour afficher les détails de l'œuvre d'art est affichée.
          <Modal artwork={selectedArtwork} onClose={closeModal} /> // Le composant Modal est affiché avec les détails de l'œuvre d'art sélectionnée et la fonction closeModal pour fermer la fenêtre modale.
        )}
      </nav>
    </main>
  );
}
