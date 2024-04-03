// Import des styles spécifiques à la page BackOffice
import './BackOfficePage.scss';

// Import des hooks useDispatch et useSelector de Redux
// useDispatch est utilisé pour envoyer des actions à le store Redux
// useSelector est utilisé pour sélectionner des données de le store Redux
import { useDispatch, useSelector } from 'react-redux';

// Import des actions du slice de configuration
// Ces actions sont utilisées pour mettre à jour l'état de la configuration dans le store Redux
import {
  updateFont,
  updateBackground,
  updateBackgroundNav,
  updateColorFont,
  updateCursor,
  updateBanner,
  updateLogo,
} from '../../store/configurationSlice';

// Import des hooks useState et useEffect de React
// useState est utilisé pour gérer l'état local dans le composant
// useEffect est utilisé pour exécuter des effets secondaires dans le composant
import { useState, useEffect } from 'react';

// Import de la fonction utilitaire pour gérer la soumission du formulaire
import { handleSubmitForm } from '../../utils/formUtils';

// Import des actions du slice des catégories d'artistes
// Ces actions sont utilisées pour mettre à jour l'état des catégories d'artistes dans le store Redux
import {
  updateCategoryColor,
  updateCategoryDescription,
  updateCategoryCurrentId,
  updateCategoryName,
  updateDeleteId,
} from '../../store/categoriesArtistSlice';

// Import des composants de dialogue de Material UI
// Ces composants sont utilisés pour afficher des dialogues dans l'application
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

// Import des actions du slice de nouvelle catégorie
// Ces actions sont utilisées pour mettre à jour l'état de la nouvelle catégorie dans le store Redux
import {
  newCategoryColor,
  newCategoryDescription,
  newCategoryName,
} from '../../store/newCategorySlice';

// Import des composants de notification de react-toastify
// Ces composants sont utilisés pour afficher des notifications dans l'application
import { toast, ToastContainer } from 'react-toastify';

// Import des styles de react-toastify
import 'react-toastify/dist/ReactToastify.css';

// Définition du composant BackOfficePage
export default function BackOfficePage() {
  // Utilisation du hook useDispatch pour envoyer des actions à Redux
  const dispatch = useDispatch();

  // Initialisation des états locaux avec useState
  const [message, setMessage] = useState(''); // Message à afficher à l'utilisateur
  const [newCategory, setNewCategory] = useState(''); // Nouvelle catégorie à créer
  const [categoryDescription, setCategoryDescription] = useState(''); // Description de la nouvelle catégorie
  const [categoryColor, setCategoryColor] = useState('#000000'); // Couleur de la nouvelle catégorie
  const [updateCategoryNewName, setUpdateCategoryNewName] = useState(''); // Nouveau nom pour la catégorie à mettre à jour
  const [updateCategoryNewColor, setUpdateCategoryNewColor] = useState('#000000'); // Nouvelle couleur pour la catégorie à mettre à jour
  const [updateCategoryNewDescription, setUpdateCategoryNewDescription] = useState(''); // Nouvelle description pour la catégorie à mettre à jour
  const [selectedCategoryName, setSelectedCategoryName] = useState(''); // Nom de la catégorie sélectionnée pour la mise à jour
  const [selectedCategoryDelete, setSelectedCategoryDelete] = useState(null); // Catégorie sélectionnée pour la suppression
  const [selectedCategoryNameDelete, setSelectedCategoryNameDelete] = useState(''); // Nom de la catégorie sélectionnée pour la suppression
  const [selectedCategoryIdDelete, setSelectedCategoryIdDelete] = useState(''); // ID de la catégorie sélectionnée pour la suppression
  const [updateCategoryId, setUpdateCategoryId] = useState(''); // ID de la catégorie à mettre à jour
  const [selectedCategory, setSelectedCategory] = useState(null); // Catégorie sélectionnée pour la mise à jour

  // Utilisation de useSelector pour accéder à l'état global de Redux
  const fontType = useSelector((state) => state.configuration.font_type); // Type de police actuel
  const backgroundColorNav = useSelector((state) => state.configuration.background_color_nav); // Couleur de fond actuelle de la navigation
  const logo = useSelector((state) => state.configuration.logo); // Logo actuel
  const banner = useSelector((state) => state.configuration.banner); // Bannière actuelle
  const cursor = useSelector((state) => state.configuration.cursor_path); // Chemin du curseur actuel
  const categories = useSelector((state) => state.categoriesArtist.list); // Liste actuelle des catégories d'artistes
  const fontColor = useSelector((state) => state.configuration.font_color); // Couleur de police actuelle
  const backgroundColor = useSelector((state) => state.configuration.background_color); // Couleur de fond actuelle
  const [shakeFields, setShakeFields] = useState(false); // État pour secouer les champs du formulaire en cas d'erreur

  // Fonction pour afficher une notification à l'utilisateur
// Le message et le type de notification sont passés en paramètres
function showNotification(message, type = 'info') {
  // Utilisation de la fonction toast de react-toastify pour afficher la notification
  toast[type](message, {
    position: 'bottom-center', // Position de la notification
    autoClose: 5000, // Temps avant la fermeture automatique de la notification
    hideProgressBar: false, // Ne pas cacher la barre de progression
    closeOnClick: true, // Fermer la notification lors d'un clic
    pauseOnHover: true, // Pause de la notification lors du survol
    draggable: true, // La notification est déplaçable
    progress: undefined, // Progression de la notification
    theme: 'dark', // Thème de la notification
  });
}

  // Fonction pour changer la police
  function fontSwitch(event) {
    const fontSelected = event.target.value; // Récupération de la police sélectionnée

    dispatch(updateFont(fontSelected)); // Envoi de l'action pour mettre à jour la police
  }

  // Fonction pour changer la couleur de la police
  function colorFontSwitch(event) {
    const colorFont = event.target.value; // Récupération de la couleur de la police sélectionnée

    dispatch(updateColorFont(colorFont)); // Envoi de l'action pour mettre à jour la couleur de la police
  }

  // Fonction pour changer la couleur de fond
  function colorBackgroundSwitch(event) {
    const colorBackground = event.target.value; // Récupération de la couleur de fond sélectionnée

    dispatch(updateBackground(colorBackground)); // Envoi de l'action pour mettre à jour la couleur de fond
  }

  // Fonction pour changer la couleur de fond de la navigation
  function colorBackgroundNavSwitch(event) {
    const colorBackgroundNav = event.target.value; // Récupération de la couleur de fond de la navigation sélectionnée

    dispatch(updateBackgroundNav(colorBackgroundNav)); // Envoi de l'action pour mettre à jour la couleur de fond de la navigation
  }

  // Fonction pour enregistrer la configuration
  function configRegister(event) {
    event.preventDefault(); // Empêcher le rechargement de la page

    const action = { type: 'CONFIG_REGISTER' }; // Définition de l'action

    dispatch(action); // Envoi de l'action

    // Affichage d'une notification pour informer l'utilisateur que les modifications ont été prises en compte
    showNotification('Les modifications ont bien été prises en compte', 'success');
  }

  // Fonction pour choisir le curseur
  function cursorChoice(event) {
    const cursor = event.target.value; // Récupération du curseur sélectionné

    dispatch(updateCursor(cursor)); // Envoi de l'action pour mettre à jour le curseur
  }

  // Fonction pour choisir la bannière
  function bannerChoice(event) {
    const banner = event.target.value; // Récupération de la bannière sélectionnée

    dispatch(updateBanner(banner)); // Envoi de l'action pour mettre à jour la bannière
  }

  // Fonction pour choisir le logo
  function logoChoice(event) {
    const logo = event.target.value; // Récupération du logo sélectionné

    dispatch(updateLogo(logo)); // Envoi de l'action pour mettre à jour le logo
  }

  // Initialisation de l'état du fichier avec useState
  const [file, setFile] = useState(null);

  // Initialisation de l'état des données du formulaire avec useState
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    production_year: '',
    technique: '',
    width: '',
    height: '',
    media: '',
    framing: false,
    quote: '',
    orientation: '',
    position: '',
    homepage_flag: false,
    category_names: [],
  });

  // Fonction pour gérer le changement des champs du formulaire
  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Si le champ est de type fichier, mettre à jour le fichier sélectionné
      setFile(e.target.files[0]);
    } else if (e.target.name === 'category_names') {
      // Si le champ est de type catégorie, mettre à jour les catégories sélectionnées
      const selectedOptions = e.target.selectedOptions;
      const selectedCategories = Array.from(
        selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, category_names: selectedCategories });
    } else {
      // Sinon, mettre à jour les données du formulaire
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (
      !formData.name ||
      !formData.position ||
      !formData.production_year ||
      !formData.width ||
      !formData.height
    ) {
      showNotification(
        'Veuillez remplir tous les champs obligatoires.',
        'error'
      );
      setShakeFields(true);
      return;
    }

    // Validation supplémentaire si nécessaire
    if (!file) {
      showNotification('Veuillez télécharger une image.', 'error');
      setShakeFields(true);
      return;
    }

    setShakeFields(false);

    // Soumission du formulaire
    handleSubmitForm({ file, data: formData })
      .then((data) => {
        // setMessage("L'image a bien été téléchargée");
        showNotification(
          'La nouvelle image a été ajoutée avec succès.',
          'success'
        );
      })
      .catch((error) => {
          //  if (error==="Seuls les fichiers image sont autorisés!"){
                showNotification('Seuls les fichiers image sont autorisés', 'error');
            // 
          // console.error(
        //   'Erreur lors de la soumission du formulaire:',
        //   error.message
        // );
        // setMessage('Une erreur est survenue');
      });
  };

  // Fonctions pour gérer le changement des champs de la nouvelle catégorie
  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value); // Mettre à jour l'état du nouveau nom de catégorie
  };
  const handleCategoryColorChange = (event) => {
    setCategoryColor(event.target.value); // Mettre à jour l'état de la nouvelle couleur de catégorie
  };
  const handleCategoryDescriptionChange = (event) => {
    setCategoryDescription(event.target.value); // Mettre à jour l'état de la nouvelle description de catégorie
  };

// Fonction pour soumettre le formulaire de la nouvelle catégorie
  const handleNewCategorySubmit = (event) => {
    event.preventDefault(); // Empêcher le rechargement de la page

    const action = { type: 'NEW_CATEGORY' }; // Définition de l'action

    // Envoi des actions pour créer une nouvelle catégorie
    dispatch(newCategoryName(newCategory));
    dispatch(newCategoryColor(categoryColor));
    dispatch(newCategoryDescription(categoryDescription));
    dispatch(action);

    // Réinitialisation des états
    setCategoryColor('#000000');
    setNewCategory('');
    setCategoryDescription('');

    // Affichage d'une notification pour informer l'utilisateur que la nouvelle catégorie a été ajoutée
    showNotification('Nouvelle catégorie ajoutée avec succès.', 'success');
  };

// Fonction pour soumettre le formulaire de mise à jour de la catégorie
const handleSubmitUpdateCategory = (e) => {
  e.preventDefault(); // Empêcher le rechargement de la page

  const action = { type: 'UPDATE_CATEGORY' }; // Définition de l'action

  // Envoi des actions pour mettre à jour la catégorie
  dispatch(updateCategoryColor(updateCategoryNewColor));
  dispatch(updateCategoryDescription(updateCategoryNewDescription));
  dispatch(updateCategoryName(updateCategoryNewName));
  dispatch(updateCategoryCurrentId(updateCategoryId));
  dispatch(action);

  // Affichage d'une notification pour informer l'utilisateur que la catégorie a été modifiée
  showNotification('La catégorie a bien été modifiée', 'success');
};

  // Fonction pour gérer la soumission du formulaire de suppression de catégorie
  const handleDeleteCategorySubmit = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page

    const action = { type: 'DELETE_CATEGORY' }; // Définition de l'action

    dispatch(updateDeleteId(selectedCategoryIdDelete)); // Envoi de l'action pour mettre à jour l'ID de la catégorie à supprimer
    dispatch(action); // Envoi de l'action pour supprimer la catégorie

    // Réinitialisation des états
    setSelectedCategoryDelete(null);
    setSelectedCategoryNameDelete('');
    setSelectedCategoryIdDelete('');

    handleClose(); // Fermeture du formulaire

    // Affichage d'une notification pour informer l'utilisateur que la catégorie a été supprimée
    showNotification('La catégorie a bien été supprimée', 'success');
  };

    // Fonction pour gérer le changement de catégorie sélectionnée pour la modification
  const handleCategorySelection = (e) => {
    const categoryName = e.target.value; // Récupération du nom de la catégorie sélectionnée
    if (!categoryName) {
      // Si aucun nom de catégorie n'est sélectionné, réinitialiser les états
      setSelectedCategory('');
      setSelectedCategoryName('');
      setUpdateCategoryNewName('');
      setUpdateCategoryNewColor('#000000');
      setUpdateCategoryNewDescription('');
      setUpdateCategoryId('');
    } else {
      // Sinon, trouver la catégorie correspondante dans la liste des catégories
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
      // Mettre à jour les états avec les informations de la catégorie sélectionnée
      setSelectedCategory(selectedCategory);
      setSelectedCategoryName(selectedCategory.name);
      setUpdateCategoryNewName(selectedCategory.name); // Pré-remplir le champ du nom de la catégorie
      setUpdateCategoryNewColor(selectedCategory.color); // Pré-remplir le champ de la couleur de la catégorie
      setUpdateCategoryNewDescription(selectedCategory.description); // Pré-remplir le champ de la description de la catégorie
      setUpdateCategoryId(selectedCategory.id);
    }
  };

    // Fonction pour gérer le changement de catégorie sélectionnée pour la suppression
  const handleCategorySelectionDelete = (e) => {
    const categoryName = e.target.value; // Récupération du nom de la catégorie sélectionnée
    if (!categoryName) {
      // Si aucun nom de catégorie n'est sélectionné, réinitialiser les états
      setSelectedCategoryDelete('');
      setSelectedCategoryNameDelete('');
      setSelectedCategoryIdDelete('');
    } else {
      // Sinon, trouver la catégorie correspondante dans la liste des catégories
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
      // Mettre à jour les états avec les informations de la catégorie sélectionnée
      setSelectedCategoryDelete(selectedCategory);
      setSelectedCategoryNameDelete(selectedCategory.name);
      setSelectedCategoryIdDelete(selectedCategory.id);
    }
  };

  // Fonctions pour gérer le changement des champs de la catégorie à mettre à jour
  const handleUpdateCategoryNameChange = (e) => {
    setUpdateCategoryNewName(e.target.value);
  };
  const handleUpdateCategoryColorChange = (e) => {
    setUpdateCategoryNewColor(e.target.value);
  };
  const handleUpdateCategoryDescriptionChange = (e) => {
    setUpdateCategoryNewDescription(e.target.value);
  };

    // Initialisation de l'état d'ouverture avec useState
  const [open, setOpen] = useState(false);

  // Fonction pour ouvrir le composant (par exemple, une boîte de dialogue)
  const handleClickOpen = () => {
    setOpen(true); // Mettre l'état d'ouverture à vrai
  };

  // Fonction pour fermer le composant
  const handleClose = () => {
    setOpen(false); // Mettre l'état d'ouverture à faux
  };

  // Fonction pour gérer le clic sur le bouton de suppression
  const handleDeleteClick = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    handleClickOpen(); // Ouvrir le composant
  };

  return (
    <div className="backOfffice">
      <form className="backOffice_form" action="post" onSubmit={configRegister}>
        {/* Fieldset pour le choix de la police */}
        <fieldset className="fieldset police">
          <legend className="legend_police">Police</legend>
          <label htmlFor="fontChoice">Choisis une police: </label>
          <select name="fontChoice" id="fontChoice" onChange={fontSwitch} value={fontType} aria-label="Choisis une police">
            {/* Options de police */}
            <option value="Protest Revolution" style={{ fontFamily: 'Protest Revolution' }}>Protest Revolution</option>
            <option value="Big Shoulders Stencil Display" style={{ fontFamily: 'Big Shoulders Stencil Display' }}>Big Shoulders Stencil Display</option>
            <option value="Big Shoulders Inline Display" style={{ fontFamily: 'Big Shoulders Inline Display' }}>Big Shoulders Inline Display</option>
            <option value="Barriecito" style={{ fontFamily: 'Barriecito' }}>Barriecito</option>
            <option value="Righteous" style={{ fontFamily: 'Righteous' }}>Righteous</option>
          </select>
          <label htmlFor="fontColor">Choisis une couleur de police: </label>
          <input 
            type="color" 
            name="fontColor" 
            id="fontColor" 
            onChange={colorFontSwitch} 
            value={fontColor} 
            aria-label="Choisis une couleur de police" />
        </fieldset>
  
        {/* Fieldset pour le choix de la couleur de fond */}
        <fieldset className="fieldset backgroundColor">
          <legend className="legend_backgroundColor">Couleur de fond</legend>
          <label htmlFor="">Choisis une couleur de fond: </label>
          <input 
            type="color" 
            name="colorBackgroundSwitch" 
            id="colorBackgroundSwitch" 
            onChange={colorBackgroundSwitch} 
            value={backgroundColor} 
            aria-label="Choisis une couleur de fond" />
        </fieldset>
  
        {/* Fieldset pour le choix de la couleur de fond de la barre de navigation */}
        <fieldset className="fieldset backgroundColorNav">
          <legend className="legend_backgroundColorNav">Couleur de fond de la barre de navigation</legend>
          <label htmlFor="">Choisis une couleur de fond de la barre de navigation: </label>
          <input type="color" name="colorBackgroundNavSwitch" id="colorBackgroundNavSwitch" onChange={colorBackgroundNavSwitch} value={backgroundColorNav} aria-label="Choisis une couleur de fond de la barre de navigation" />
        </fieldset>
  
        {/* Fieldset pour le choix du logo */}
        <fieldset className="fieldset logoChoice">
          <legend className="legend_logo">Logo</legend>
          <label htmlFor="">Choisis un logo :</label>
          <select name="logoChoice" id="" onChange={logoChoice} value={logo} aria-label="Choisis un logo">
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logoFondNoir.png`}>Logo de base</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-photo.png`}>Photographe</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-chevalet.png`}>Peintre</option>
          </select>
        </fieldset>
  
        {/* Fieldset pour le choix du curseur de souris */}
        <fieldset className="fieldset cursor">
          <legend className="legend_cursor">Curseur</legend>
          <label htmlFor="cursorChoice">Choisis ton curseur </label>
          <select name="cursorChoice" id="cursorChoice" onChange={cursorChoice} value={cursor} aria-label="Choisis ton curseur">
            <option value="">Classique</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/pinceau.png`}>Pinceau</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/camera.png`}>Appareil photo</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/palette.png`}>Palette peinture</option>
          </select>
        </fieldset>
  
        {/* Fieldset pour le choix de la bannière */}
        <fieldset className="fieldset">
          <legend className="legend_banner">Bannière</legend>
          <label htmlFor="bannerChoice">Choisis ta bannière</label>
          <select name="bannerChoice" id="bannerChoice" onChange={bannerChoice} value={banner} aria-label="Choisis ta bannière">
            <option value="">Aucune</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/plantes.jpg`}>Plantes</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/chauve-souris-gris-rose.jpeg`}>Boule de matière</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/etoiles.jpeg`}>Etoiles</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/abstrait-jaune-vert.jpeg`}>Abstrait</option>
            <option value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/toile-coloree-bleu-vert.jpeg`}>Toile</option>
          </select>
        </fieldset>
      
        {/* <fieldset className="fieldset design">
          <legend className="legend_design">Disposition</legend>
          <label htmlFor="design">Choisis ton design </label>
          <select name="" id="">
            <option value="">Portrait</option>
            <option value="">Paysage</option>
          </select>
        </fieldset> */}

        {/* Bouton pour enregistrer les modifications */}
        <input
          className="validButtonBack"
          type="submit"
          value="Enregistrer les modifications"
          onClick={configRegister}
        />
      </form>

        {/* Composant pour afficher les notifications */}
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

        {/* Formulaire pour télécharger une image */}
      <form
          id="mainForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="backOffice_form"
          aria-label="Formulaire de téléchargement d'image"
        >
        <fieldset className="fieldset">
          <legend className="legend_multer">Télécharger une image</legend>

          {/* Champ pour sélectionner le fichier à télécharger */}
          <label htmlFor="fichier">Image* :</label>
          <input
            type="file"
            id="file"
            name="fichier"
            onChange={handleChange}
            className={`input ${!file && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />

          {/* Champs pour entrer les informations sur l'image */}
          <label htmlFor="name">Nom* :</label>
          <input
            type="text"
            id="name"
            name="name"
            title="Entrez le nom de l'oeuvre téléchargée"
            value={formData.name}
            onChange={handleChange}
            className={`input ${!formData.name && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />
          <label htmlFor="description">Description :</label>
          <input
            type="text"
            id="description"
            name="description"
            title="Entrez la description de l'oeuvre téléchargée"
            value={formData.description}
            onChange={handleChange}
          />
          <label htmlFor="production_year">Date de réalisation* :</label>
          <input
            type="date"
            id="production_year"
            name="production_year"
            title="Entrez la date de réalisation de l'oeuvre téléchargée"
            value={formData.production_year}
            onChange={handleChange}
            className={`input ${!formData.production_year && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />
          <label htmlFor="technique">Technique :</label>
          <input
            type="text"
            id="technique"
            name="technique"
            title="Entrez la technique de réalisation de l'oeuvre téléchargée"
            value={formData.technique}
            onChange={handleChange}
          />
          <label htmlFor="width">Largeur en cm* :</label>
          <input
            type="number"
            id="width"
            name="width"
            title="Saisissez un nombre entier pour la largeur de l'oeuvre téléchargée"
            value={formData.width}
            onChange={handleChange}
            className={`input ${!formData.width && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />
          <label htmlFor="height">Hauteur en cm* :</label>
          <input
            type="number"
            id="height"
            name="height"
            title="Saisissez un nombre entier pour la hauteur de l'oeuvre téléchargée"
            value={formData.height}
            onChange={handleChange}
            className={`input ${!formData.height && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />
          <label htmlFor="quote">Citation :</label>
          <input
            type="text"
            id="quote"
            name="quote"
            title="Entrez une citation de votre choix que vous associez à l'oeuvre téléchargée"
            value={formData.quote}
            onChange={handleChange}
          />
          <label htmlFor="media">Support :</label>
          <input
            type="text"
            id="media"
            name="media"
            title="Entrez le support sur lequel est réalisée l'oeuvre téléchargée"
            value={formData.media}
            onChange={handleChange}
          />
          <label htmlFor="position">Position* :</label>
          <input
            type="number"
            id="position"
            name="position"
            title="Saisissez un nombre entier pour déterminer la position d'affichage"
            value={formData.position}
            onChange={handleChange}
            className={`input ${!formData.position && shakeFields ? 'input-error shake' : ''}`}
            aria-required="true"
          />

          {/* Sélection de l'orientation de l'œuvre */}
          <label htmlFor="orientation">Orientation :</label>
          <select
            id="orientation"
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
            aria-label="Sélection de l'orientation de l'œuvre"
          >
            {!formData.orientation && <option value="">Sélectionner</option>}
            <option value="portrait">Portrait</option>
            <option value="paysage">Paysage</option>
          </select>

          {/* Sélection des catégories de l'œuvre */}
          <label htmlFor="category_names">Catégories :</label>
          <select
            id="category_names"
            name="category_names"
            value={formData.category_names}
            onChange={handleChange}
            multiple
            aria-label="Sélection des catégories de l'œuvre"
          >
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Case à cocher pour la mise en page sur la page d'accueil */}
          <label htmlFor="homepage_flag" title="Sélectionnez si l'image doit apparaître sur la page d'accueil">
            Page d'accueil :
          </label>
          <input
            type="checkbox"
            id="homepage_flag"
            name="homepage_flag"
            checked={formData.homepage_flag}
            onChange={(e) => setFormData({ ...formData, homepage_flag: e.target.checked })}
            aria-label="Sélectionnez si l'image doit apparaître sur la page d'accueil"
          />
          <label htmlFor="framing" title="Cochez si l'oeuvre est encadrée">
            Encadré :
          </label>
          <input
            type="checkbox"
            id="framing"
            name="framing"
            checked={formData.framing}
            onChange={(e) => setFormData({ ...formData, framing: e.target.checked })}
            aria-label="Cochez si l'oeuvre est encadrée"
          />
        </fieldset>

            {/* Bouton de soumission du formulaire */}
            <input
              className="validButtonBack"
              type="submit"
              value="Télécharger l'image"
              aria-label="Télécharger l'image"
            />
            <p>{message}</p>
      </form>

      {/* Formulaire pour ajouter une nouvelle catégorie */}
      <form onSubmit={handleNewCategorySubmit} className="backOffice_form">
        <fieldset className="fieldset">
          <legend className="legend">Ajouter une nouvelle catégorie</legend>
          <label htmlFor="newCategory">Nom de la catégorie* :</label>
          <input
            type="text"
            id="newCategory"
            name="newCategory"
            value={newCategory}
            onChange={handleNewCategoryChange}
          />
          <label htmlFor="categoryDescription">Description de la catégorie :</label>
          <input
            type="text"
            id="categoryDescription"
            name="categoryDescription"
            value={categoryDescription}
            onChange={handleCategoryDescriptionChange}
          />
          <label htmlFor="categoryColor">Couleur de la catégorie* :</label>
          <input
            type="color"
            id="categoryColor"
            name="categoryColor"
            value={categoryColor}
            onChange={handleCategoryColorChange}
          />
          <input
            className="validButtonBack"
            type="submit"
            value="Ajouter la catégorie"
          />
        </fieldset>
      </form>

      {/* Formulaire pour modifier une catégorie */}
      <form onSubmit={handleSubmitUpdateCategory} className="backOffice_form">
        <fieldset className="fieldset">
          <legend className="legend">Modifier une catégorie</legend>
          <label htmlFor="updateCategory">Nom de la catégorie :</label>
          <select
            id="category_names"
            name="category_names"
            value={selectedCategoryName}
            onChange={handleCategorySelection}
          >
            {!selectedCategory && (
              <option value="">Veuillez choisir une catégorie</option>
            )}
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <label htmlFor="updateCategoryName">Nouveau nom de la catégorie :</label>
          <input
            type="text"
            id="updateCategoryName"
            name="updateCategoryName"
            value={updateCategoryNewName}
            onChange={handleUpdateCategoryNameChange}
          />
          <label htmlFor="updateCategoryDescription">Description de la catégorie :</label>
          <input
            type="text"
            id="updateCategoryDescription"
            name="updateCategoryDescription"
            value={updateCategoryNewDescription}
            onChange={handleUpdateCategoryDescriptionChange}
          />
          <label htmlFor="updateCategoryColor">Couleur de la catégorie :</label>
          <input
            type="color"
            id="updateCategoryColor"
            name="updateCategoryColor"
            value={updateCategoryNewColor}
            onChange={handleUpdateCategoryColorChange}
          />
          <input
            className="validButtonBack"
            type="submit"
            value="Modifier la catégorie"
          />
        </fieldset>
      </form>

      {/* Formulaire pour supprimer une catégorie */}
      <form onSubmit={handleDeleteClick} className="backOffice_form">
        <fieldset className="fieldset">
          <legend className="legend">Supprimer une catégorie</legend>
          <label htmlFor="deleteCategory">Nom de la catégorie à supprimer :</label>
          <select
            id="category_names"
            name="category_names"
            value={selectedCategoryNameDelete}
            onChange={handleCategorySelectionDelete}
          >
            {!selectedCategoryDelete && (
              <option value="">Veuillez choisir une catégorie</option>
            )}
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <input
            className="validButtonBack"
            type="submit"
            value="Supprimer la catégorie"
          />
        </fieldset>
      </form>

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
            Êtes-vous sûr de vouloir supprimer la catégorie ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCategorySubmit} aria-label="Confirmer la suppression">Oui</Button>
          <Button onClick={handleClose} autoFocus aria-label="Annuler la suppression">Non</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


