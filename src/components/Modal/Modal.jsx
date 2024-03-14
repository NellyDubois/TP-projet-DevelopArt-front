import { useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { dateUtils } from '../../utils/dateUtils';
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
import './Modal.scss';

export default function CustomModal({ artwork, onClose }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categoriesArtist.list);
  const [newArtworkName, setNewArtworkName] = useState(artwork.name);
  const [newArtworkDescription, setNewArtworkDescription] = useState(
    artwork.description
  );
  const [newArtworkFraming, setNewArtworkFraming] = useState(artwork.framing);
  const [newArtworkWidth, setNewArtworkWidth] = useState(artwork.width);
  const [newArtworkHeight, setNewArtworkHeight] = useState(artwork.height);
  const [newArtworkMedia, setNewArtworkMedia] = useState(artwork.media);
  const [newArtworkOrientation, setNewArtworkOrientation] = useState(
    artwork.orientation
  );
  const [newArtworkProductionYear, setNewArtworkProductionYear] = useState(
    dateUtils(artwork.production_year)
  );
  const [newArtworkQuote, setNewArtworkQuote] = useState(artwork.quote);
  const [newArtworkTechnique, setNewArtworkTechnique] = useState(
    artwork.technique
  );
  const [newArtworkCategoryNames, setNewArtworkCategoryNames] = useState(
    artwork.categories
  );

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

  const handleSubmit = () => {
    const action = { type: 'UPDATE_ARTWORK_HOMEPAGE' };
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
    dispatch(action);
    onClose();
  };

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
        />
        <TextField
          type="number"
          label="Largeur"
          value={newArtworkWidth}
          onChange={handleWidthChange}
          fullWidth
        />
        <TextField
          type="number"
          label="Hauteur"
          value={newArtworkHeight}
          onChange={handleHeightChange}
          fullWidth
        />
        <TextField
          label="Technique"
          value={newArtworkTechnique}
          onChange={handleTechniqueChange}
          fullWidth
        />
        <TextField
          label="Support"
          value={newArtworkMedia}
          onChange={handleMediaChange}
          fullWidth
        />
        <TextField
          label="Citation"
          value={newArtworkQuote}
          onChange={handleQuoteChange}
          fullWidth
        />
        <TextField
          type="date"
          label="Date de réalisation"
          value={newArtworkProductionYear}
          onChange={handleProductionYearChange}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel id="orientation-label">Orientation</InputLabel>
          <Select
            labelId="orientation-label"
            id="orientation"
            value={newArtworkOrientation}
            onChange={handleOrientationChange}
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
        />
        <div className="modal-buttons">
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="save-button"
          >
            Enregistrer
          </Button>
          <Button
            onClick={onClose}
            variant="outlined"
            className="cancel-button"
          >
            Annuler
          </Button>
        </div>
      </div>
    </Modal>
  );
}
