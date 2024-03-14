import './BackOfficePage.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateFont,
  updateBackground,
  updateBackgroundNav,
  updateColorFont,
  updateCursor,
  updateBanner,
  updateLogo,
} from '../../store/configurationSlice';
import { useState, useEffect } from 'react';
import { handleSubmitForm } from '../../utils/formUtils';
import {
  updateCategoryColor,
  updateCategoryDescription,
  updateCategoryCurrentId,
  updateCategoryName,
  updateDeleteId,
} from '../../store/categoriesArtistSlice';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import {
  newCategoryColor,
  newCategoryDescription,
  newCategoryName,
} from '../../store/newCategorySlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function BackOfficePage() {
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryColor, setCategoryColor] = useState('#000000');
  const [updateCategoryNewName, setUpdateCategoryNewName] = useState('');
  const [updateCategoryNewColor, setUpdateCategoryNewColor] =
    useState('#000000');
  const [updateCategoryNewDescription, setUpdateCategoryNewDescription] =
    useState('');
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  const [selectedCategoryDelete, setSelectedCategoryDelete] = useState(null);
  const [selectedCategoryNameDelete, setSelectedCategoryNameDelete] =
    useState('');
  const [selectedCategoryIdDelete, setSelectedCategoryIdDelete] = useState('');
  const [updateCategoryId, setUpdateCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fontType = useSelector((state) => state.configuration.font_type);
  const backgroundColorNav = useSelector(
    (state) => state.configuration.background_color_nav
  );
  const logo = useSelector((state) => state.configuration.logo);
  const banner = useSelector((state) => state.configuration.banner);
  const cursor = useSelector((state) => state.configuration.cursor_path);
  const categories = useSelector((state) => state.categoriesArtist.list);
  const fontColor = useSelector((state) => state.configuration.font_color);
  const backgroundColor = useSelector(
    (state) => state.configuration.background_color
  );
  const [shakeFields, setShakeFields] = useState(false);

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

  function fontSwitch(event) {
    const fontSelected = event.target.value;

    dispatch(updateFont(fontSelected));
  }

  function colorFontSwitch(event) {
    const colorFont = event.target.value;

    dispatch(updateColorFont(colorFont));
  }

  function colorBackgroundSwitch(event) {
    const colorBackground = event.target.value;

    dispatch(updateBackground(colorBackground));
  }

  function colorBackgroundNavSwitch(event) {
    const colorBackgroundNav = event.target.value;

    dispatch(updateBackgroundNav(colorBackgroundNav));
  }

  function configRegister(event) {
    event.preventDefault();

    const action = { type: 'CONFIG_REGISTER' };

    dispatch(action);

    showNotification(
      'Les modifications ont bien été prises en compte',
      'success'
    );
  }

  function cursorChoice(event) {
    const cursor = event.target.value;

    dispatch(updateCursor(cursor));
  }
  function bannerChoice(event) {
    const banner = event.target.value;

    dispatch(updateBanner(banner));
  }
  function logoChoice(event) {
    const logo = event.target.value;

    dispatch(updateLogo(logo));
  }

  const [file, setFile] = useState(null);
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
  const handleChange = (e) => {
    if (e.target.type === 'file') {
      // Si le champ est de type fichier, mettre à jour le fichier sélectionné
      setFile(e.target.files[0]);
    } else if (e.target.name === 'category_names') {
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

    handleSubmitForm({ file, data: formData })
      .then((data) => {
        setMessage("L'image a bien été téléchargée");
        showNotification(
          'La nouvelle image a été ajoutée avec succès.',
          'success'
        );
      })
      .catch((error) => {
        console.error(
          'Erreur lors de la soumission du formulaire:',
          error.message
        );
        setMessage('Une erreur est survenue');
      });
  };

  const handleNewCategoryChange = (event) => {
    setNewCategory(event.target.value);
  };
  const handleCategoryColorChange = (event) => {
    setCategoryColor(event.target.value);
  };
  const handleCategoryDescriptionChange = (event) => {
    setCategoryDescription(event.target.value);
  };
  const handleNewCategorySubmit = (event) => {
    event.preventDefault();

    const action = { type: 'NEW_CATEGORY' };
    dispatch(newCategoryName(newCategory));
    dispatch(newCategoryColor(categoryColor));
    dispatch(newCategoryDescription(categoryDescription));
    dispatch(action);
    setCategoryColor('#000000');
    setNewCategory('');
    setCategoryDescription('');

    showNotification('Nouvelle catégorie ajoutée avec succès.', 'success');
  };

  const handleSubmitUpdateCategory = (e) => {
    e.preventDefault();
    const action = { type: 'UPDATE_CATEGORY' };
    dispatch(updateCategoryColor(updateCategoryNewColor));
    dispatch(updateCategoryDescription(updateCategoryNewDescription));
    dispatch(updateCategoryName(updateCategoryNewName));
    dispatch(updateCategoryCurrentId(updateCategoryId));
    dispatch(action);
    showNotification('La catégorie a bien été modifiée', 'success');
  };

  const handleDeleteCategorySubmit = (e) => {
    e.preventDefault();
    const action = { type: 'DELETE_CATEGORY' };
    dispatch(updateDeleteId(selectedCategoryIdDelete));
    dispatch(action);
    setSelectedCategoryDelete(null);
    setSelectedCategoryNameDelete('');
    setSelectedCategoryIdDelete('');
    handleClose();
    showNotification('La catégorie a bien été supprimée', 'success');
  };

  // Fonction pour gérer le changement de catégorie sélectionnée pour la modification
  const handleCategorySelection = (e) => {
    const categoryName = e.target.value;
    if (!categoryName) {
      setSelectedCategory('');
      setSelectedCategoryName('');
      setUpdateCategoryNewName('');
      setUpdateCategoryNewColor('#000000');
      setUpdateCategoryNewDescription('');
      setUpdateCategoryId('');
    } else {
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
      setSelectedCategory(selectedCategory);
      setSelectedCategoryName(selectedCategory.name);
      setUpdateCategoryNewName(selectedCategory.name); // Pré-remplir le champ du nom de la catégorie
      setUpdateCategoryNewColor(selectedCategory.color); // Pré-remplir le champ de la couleur de la catégorie
      setUpdateCategoryNewDescription(selectedCategory.description); // Pré-remplir le champ de la description de la catégorie
      setUpdateCategoryId(selectedCategory.id);
    }
  };
  const handleCategorySelectionDelete = (e) => {
    const categoryName = e.target.value;
    if (!categoryName) {
      setSelectedCategoryDelete('');
      setSelectedCategoryNameDelete('');
      setSelectedCategoryIdDelete('');
    } else {
      const selectedCategory = categories.find(
        (category) => category.name === categoryName
      );
      setSelectedCategoryDelete(selectedCategory);
      setSelectedCategoryNameDelete(selectedCategory.name);
      setSelectedCategoryIdDelete(selectedCategory.id);
    }
  };

  const handleUpdateCategoryNameChange = (e) => {
    setUpdateCategoryNewName(e.target.value);
  };
  const handleUpdateCategoryColorChange = (e) => {
    setUpdateCategoryNewColor(e.target.value);
  };
  const handleUpdateCategoryDescriptionChange = (e) => {
    setUpdateCategoryNewDescription(e.target.value);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    handleClickOpen();
  };

  return (
    <div className="backOfffice">
      <form className="backOffice_form" action="post" onSubmit={configRegister}>
        <fieldset className="fieldset police">
          <legend className="legend_police">Police</legend>

          <label htmlFor="fontChoice">Choisis une police: </label>
          <select
            name="fontChoice"
            id=""
            onChange={fontSwitch}
            value={fontType}
          >
            <option
              value="Protest Revolution"
              style={{ fontFamily: 'Protest Revolution' }}
            >
              Protest Revolution
            </option>
            <option
              value="Big Shoulders Stencil Display"
              style={{ fontFamily: 'Big Shoulders Stencil Display' }}
            >
              Big Shoulders Stencil Display
            </option>
            <option
              value="Big Shoulders Inline Display"
              style={{ fontFamily: 'Big Shoulders Inline Display' }}
            >
              Big Shoulders Inline Display
            </option>
            <option value="Barriecito" style={{ fontFamily: 'Barriecito' }}>
              Barriecito
            </option>
            <option value="Righteous" style={{ fontFamily: 'Righteous' }}>
              Righteous
            </option>
          </select>

          <label htmlFor="fontColor">Choisis une couleur de police: </label>
          <input
            type="color"
            name="fontColor"
            id="fontColor"
            onChange={colorFontSwitch}
            value={fontColor}
          />
        </fieldset>

        <fieldset className="fieldset backgroundColor">
          <legend className="legend_backgroundColor">Couleur de fond</legend>

          <label htmlFor="">Choisis une couleur de fond: </label>
          <input
            type="color"
            name="colorBackgroundSwitch"
            id="colorBackgroundSwitch"
            onChange={colorBackgroundSwitch}
            value={backgroundColor}
          />
        </fieldset>

        <fieldset className="fieldset backgroundColorNav">
          <legend className="legend_backgroundColorNav">
            Couleur de fond de la barre de navigation
          </legend>

          <label htmlFor="">
            Choisis une couleur de fond de la barre de navigation:{' '}
          </label>
          <input
            type="color"
            name="colorBackgroundNavSwitch"
            id="colorBackgroundNavSwitch"
            onChange={colorBackgroundNavSwitch}
            value={backgroundColorNav}
          />
        </fieldset>

        <fieldset className="fieldset logoChoice">
          <legend className="legend_logo">Logo</legend>

          <label htmlFor="">Choisis un logo :</label>
          <select name="logoChoice" id="" onChange={logoChoice} value={logo}>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logoFondNoir.png`}
            >
              Logo de base
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-photo.png`}
            >
              Photographe
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-chevalet.png`}
            >
              Peintre
            </option>
          </select>
        </fieldset>

        <fieldset className="fieldset cursor">
          <legend className="legend_cursor">Curseur</legend>

          <label htmlFor="cursorChoice">Choisis ton curseur </label>
          <select
            name="cursorChoice"
            id=""
            onChange={cursorChoice}
            value={cursor}
          >
            <option value="">Classique</option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/pinceau.png`}
            >
              Pinceau
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/camera.png`}
            >
              Appareil photo
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/cursor/palette.png`}
            >
              Palette peinture
            </option>
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="legend_banner">Bannière</legend>

          <label htmlFor="bannerChoice">Choisis ta bannière</label>
          <select
            name="bannerChoice"
            id=""
            onChange={bannerChoice}
            value={banner}
          >
            <option value="">Aucune</option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/plantes.jpg`}
            >
              Plantes
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/chauve-souris-gris-rose.jpeg`}
            >
              Boule de matière
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/etoiles.jpeg`}
            >
              Etoiles
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/abstrait-jaune-vert.jpeg`}
            >
              Abstrait
            </option>
            <option
              value={`${process.env.REACT_APP_BASE_URL_BACK}/banner/toile-coloree-bleu-vert.jpeg`}
            >
              Toile
            </option>
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

        <input
          className="validButtonBack"
          type="submit"
          value="Enregistrer les modifs"
          onClick={configRegister}
        />
      </form>
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
      <form
        id="mainForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="backOffice_form"
      >
        {/* Champ de sélection de fichier */}
        <fieldset className="fieldset">
          <legend className="legend_multer">Télécharger une image</legend>
          <label htmlFor="fichier">Image* :</label>
          <input
            type="file"
            id="file"
            name="fichier"
            onChange={handleChange}
            className={`input ${
              !file && shakeFields ? 'input-error shake' : ''
            }`}
          />
          {/* Champs de texte pour les données du formulaire */}
          <label htmlFor="name">Nom* :</label>
          <input
            type="text"
            id="name"
            name="name"
            title="Entrez le nom de l'oeuvre téléchargée"
            value={formData.name}
            onChange={handleChange}
            className={`input ${
              !formData.name && shakeFields ? 'input-error shake' : ''
            }`}
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
            className={`input ${
              !formData.production_year && shakeFields
                ? 'input-error shake'
                : ''
            }`}
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
            className={`input ${
              !formData.width && shakeFields ? 'input-error shake' : ''
            }`}
          />
          <label htmlFor="height">Hauteur en cm* :</label>
          <input
            type="number"
            id="height"
            name="height"
            title="Saisissez un nombre entier pour la hauteur de l'oeuvre téléchargée"
            value={formData.height}
            onChange={handleChange}
            className={`input ${
              !formData.height && shakeFields ? 'input-error shake' : ''
            }`}
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
            className={`input ${
              !formData.position && shakeFields ? 'input-error shake' : ''
            }`}
          />
          {/* Sélection de l'orientation de l'œuvre */}
          <label htmlFor="orientation">Orientation :</label>
          <select
            id="orientation"
            name="orientation"
            value={formData.orientation}
            onChange={handleChange}
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
          >
            {categories.map((category) => (
              <option value={category.name} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Case à cocher pour la mise en page sur la page d'accueil */}
          <label
            htmlFor="homepage_flag"
            title="Sélectionnez si l'image doit apparaître sur la page d'accueil"
          >
            Page d'accueil :
          </label>
          <input
            type="checkbox"
            id="homepage_flag"
            name="homepage_flag"
            checked={formData.homepage_flag}
            onChange={(e) =>
              setFormData({ ...formData, homepage_flag: e.target.checked })
            }
          />
          <label htmlFor="framing" title="Cochez si l'oeuvre est encadrée">
            Encadré :
          </label>
          <input
            type="checkbox"
            id="framing"
            name="framing"
            checked={formData.framing}
            onChange={(e) =>
              setFormData({ ...formData, framing: e.target.checked })
            }
          />
        </fieldset>

        {/* Bouton de soumission du formulaire */}
        <input
          className="validButtonBack"
          type="submit"
          value="Télécharger l'image"
        />
        <p>{message}</p>
      </form>

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
          <label htmlFor="categoryDescription">
            Description de la catégorie :
          </label>
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
          <label htmlFor="updateCategoryName">
            Nouveau nom de la catégorie :
          </label>
          <input
            type="text"
            id="updateCategoryName"
            name="updateCategoryName"
            value={updateCategoryNewName}
            onChange={handleUpdateCategoryNameChange}
          />
          <label htmlFor="updateCategoryDescription">
            Description de la catégorie :
          </label>
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
      <form onSubmit={handleDeleteClick} className="backOffice_form">
        <fieldset className="fieldset">
          <legend className="legend">Supprimer une catégorie</legend>

          <label htmlFor="deleteCategory">
            Nom de la catégorie à supprimer :
          </label>
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
          <Button onClick={handleDeleteCategorySubmit}>Oui</Button>
          <Button onClick={handleClose} autoFocus>
            Non
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
