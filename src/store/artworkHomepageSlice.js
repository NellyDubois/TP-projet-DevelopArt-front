import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  name: '',
  id: '',
  description: '',
  framing: '',
  width: '',
  height: '',
  media: '',
  orientation: '',
  productionYear: '',
  quote: '',
  technique: '',
  
  categoryNames: [], 
  list: [],
};

const artworkHomepageSlice = createSlice({
  name: 'artworkHomepage',
  initialState,
  reducers: {
    updateArtworkHomepage: (state, action) => {
      return {
        ...state,
        list: [...action.payload],
      };
    },
    updateId: (state, action) => {
      return {
        ...state,
        id: action.payload,
      };
    },
    updateName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    updateDescription: (state, action) => {
      return {
        ...state,
        description: action.payload,
      };
    },
    updateQuote: (state, action) => {
      return {
        ...state,
        quote: action.payload,
      };
    },
    updateWidth: (state, action) => {
      return {
        ...state,
        width: action.payload,
      };
    },
    updateHeight: (state, action) => {
      return {
        ...state,
        height: action.payload,
      };
    },
    updateTechnique: (state, action) => {
      return {
        ...state,
        technique: action.payload,
      };
    },
    updateOrientation: (state, action) => {
      return {
        ...state,
        orientation: action.payload,
      };
    },
    updateMedia: (state, action) => {
      return {
        ...state,
        media: action.payload,
      };
    },
    updateFraming: (state, action) => {
      return {
        ...state,
        framing: action.payload,
      };
    },
    updateProductionYear: (state, action) => {
      return {
        ...state,
        productionYear: action.payload,
      };
    },
    updateCategories: (state, action) => {
      return {
        ...state,
        categoryNames: [...action.payload]
      }
    }
  },
});

export const {
  updateArtworkHomepage,
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
  updateCategories
} = artworkHomepageSlice.actions;
export default artworkHomepageSlice.reducer;
