// Import des hooks nécessaires de React et Redux
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import des composants nécessaires de Material UI
import {
  Modal,
  Button,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  TextareaAutosize,
  Chip,
} from '@mui/material';

// Import des actions nécessaires du slice artworkHomepage
import {
  updateId,
  updateDescription,
  updateName,
  updateFraming,
  updateHeight,
  updateWidth,
  updateMedia,
  updateProductionYear,
  updateTechnique,
  updateOrientation,
  updateQuote,
  updateCategories,
} from '../../store/artworkHomepageSlice';

// Import des styles spécifiques à ce composant
import './Modal.scss';

// Définition du composant CustomModal
export default function CustomModal({ artwork, onClose }) {

  // Utilisation du hook useDispatch pour pouvoir dispatcher des actions
  const dispatch = useDispatch();

  // Utilisation du hook useSelector pour accéder à l'état du store Redux
  const categories = useSelector((state) => state.categoriesArtist.list);

  // Définition des états locaux pour chaque champ du formulaire
  const [newArtworkName, setNewArtworkName] = useState(artwork.name);
  const [newArtworkDescription, setNewArtworkDescription] = useState(artwork.description);
  const [newArtworkFraming, setNewArtworkFraming] = useState(artwork.framing);
  const [newArtworkWidth, setNewArtworkWidth] = useState(artwork.width);
  const [newArtworkHeight, setNewArtworkHeight] = useState(artwork.height);
  const [newArtworkMedia, setNewArtworkMedia] = useState(artwork.media);
  const [newArtworkOrientation, setNewArtworkOrientation] = useState(artwork.orientation);
  const [newArtworkProductionYear, setNewArtworkProductionYear] = useState(artwork.production_year);
  const [newArtworkQuote, setNewArtworkQuote] = useState(artwork.quote);
  const [newArtworkTechnique, setNewArtworkTechnique] = useState(artwork.technique);
  const [newArtworkCategoryNames, setNewArtworkCategoryNames] = useState(artwork.categories);

  // Définition des fonctions de gestion des changements pour chaque champ du formulaire
  const handleNameChange = (event) => {
    setNewArtworkName(event.target.value);
  };
  const handleDescriptionChange = (event) => {
    setNewArtworkDescription(event.target.value);
  };
  const handleFramingChange = (event) => {
    setNewArtworkFraming(event.target.checked);
  };
  const handleWidthChange = (event) => {
    setNewArtworkWidth(event.target.value);
  };
  const handleHeightChange = (event) => {
    setNewArtworkHeight(event.target.value);
  };
  const handleMediaChange = (event) => {
    setNewArtworkMedia(event.target.value);
  };
  const handleOrientationChange = (event) => {
    setNewArtworkOrientation(event.target.value);
  };
  const handleProductionYearChange = (event) => {
    setNewArtworkProductionYear(event.target.value);
  };
  const handleQuoteChange = (event) => {
    setNewArtworkQuote(event.target.value);
  };
  const handleTechniqueChange = (event) => {
    setNewArtworkTechnique(event.target.value);
  };
  const handleCategoriesChange = (event) => {
    const selectedCategories = event.target.value;
    setNewArtworkCategoryNames(selectedCategories);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = () => {
    // Dispatch des actions pour mettre à jour chaque champ de l'œuvre d'art dans le store Redux
    dispatch(updateId(artwork.id));
    dispatch(updateDescription(newArtworkDescription));
    dispatch(updateName(newArtworkName));
    dispatch(updateFraming(newArtworkFraming));
    dispatch(updateOrientation(newArtworkOrientation));
    dispatch(updateTechnique(newArtworkTechnique));
    dispatch(updateQuote(newArtworkQuote));
    dispatch(updateHeight(newArtworkHeight));
    dispatch(updateWidth(newArtworkWidth));
    dispatch(updateMedia(newArtworkMedia));
    dispatch(updateProductionYear(newArtworkProductionYear));
    dispatch(updateCategories(newArtworkCategoryNames));

    // Dispatch de l'action pour mettre à jour l'œuvre d'art dans le store Redux
    dispatch({ type: 'UPDATE_ARTWORK_HOMEPAGE' });
    // Appel de la fonction onClose pour fermer la fenêtre modale
    onClose();
  };

  // Rendu du composant
  return (
    <Modal
      open={true}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className="modal-content">
        <h2 id="modal-modal-title">Modifier les caractéristiques de l'image</h2>
        <TextField
          label="Nom"
          value={newArtworkName}
          onChange={handleNameChange}
          fullWidth
          aria-label="Nom de l'œuvre"
        />
        <TextField
          type="number"
          label="Largeur"
          value={newArtworkWidth}
          onChange={handleWidthChange}
          fullWidth
          aria-label="Largeur de l'œuvre"
        />
        <TextField
          type="number"
          label="Hauteur"
          value={newArtworkHeight}
          onChange={handleHeightChange}
          fullWidth
          aria-label="Hauteur de l'œuvre"
        />
        <TextField
          label="Technique"
          value={newArtworkTechnique}
          onChange={handleTechniqueChange}
          fullWidth
          aria-label="Technique de l'œuvre"
        />
        <TextField
          label="Support"
          value={newArtworkMedia}
          onChange={handleMediaChange}
          fullWidth
          aria-label="Support de l'œuvre"
        />
        <TextField
          label="Citation"
          value={newArtworkQuote}
          onChange={handleQuoteChange}
          fullWidth
          aria-label="Citation de l'œuvre"
        />
        <TextField
          type="date"
          label="Date de réalisation"
          value={newArtworkProductionYear}
          onChange={handleProductionYearChange}
          fullWidth
          aria-label="Date de réalisation de l'œuvre"
        />
        <FormControl fullWidth>
          <InputLabel id="orientation-label">Orientation</InputLabel>
          <Select
            labelId="orientation-label"
            id="orientation"
            value={newArtworkOrientation}
            onChange={handleOrientationChange}
            aria-label="Orientation de l'œuvre"
          >
            <MenuItem value="portrait">Portrait</MenuItem>
            <MenuItem value="paysage">Paysage</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="category-label">Catégories</InputLabel>
          <Select
            labelId="category-label"
            id="category_names"
            value={newArtworkCategoryNames.length > 0 ? newArtworkCategoryNames : []}
            onChange={handleCategoriesChange}
            multiple
            aria-label="Catégories de l'œuvre"
            // renderValue affiche une puce pour chaque catégorie sélectionnée avec un fond coloré correspondant à la couleur de la catégorie
            renderValue={(selected) => (
              <div>
                {newArtworkCategoryNames && selected.map((value) => {
                  if (value === null) {
                    return
                  }
                  const category = categories.find((cat) => cat.name === value);
                  return (
                    <Chip
                      key={value}
                      label={value}
                      style={{ backgroundColor: value ? category.color : '' }}
                    />
                  );
                })}
              </div>
            )}
          >
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.name}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={newArtworkFraming}
              onChange={handleFramingChange}
              aria-label="Encadré"
            />
          }
          label="Encadré"
          className="custom-checkbox-label"
        />
        <TextareaAutosize
          rowsmin={3}
          placeholder="Nouvelle description"
          value={newArtworkDescription}
          onChange={handleDescriptionChange}
          style={{ width: '100%', marginBottom: '1rem' }}
          aria-label="Description de l'œuvre"
        />
        <div className="modal-buttons">
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="save-button"
            aria-label="Enregistrer les modifications"      
          >
            Enregistrer
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            className="cancel-button"
            aria-label="Annuler les modifications"
          >
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
}