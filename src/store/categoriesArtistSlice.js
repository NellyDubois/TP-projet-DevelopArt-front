import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: '',
  name: '',
  description: '',
  color: '',
  deleteId: '',
  list: [],
};

const categoriesArtistSlice = createSlice({
  name: 'categoriesArtist',
  initialState,
  reducers: {
    getCategoriesArtist: (state, action) => {
      return {
        ...state,
        list: [...action.payload]
        ,
      };
    },
    updateCategoryName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      }
    },
    updateCategoryColor: (state, action) => {
      return {
        ...state,
        color: action.payload
      }
    },
    updateCategoryDescription: (state, action) => {
      return {
        ...state,
        description: action.payload
      }
    },
    updateCategoryCurrentId: (state, action) => {
      return {
        ...state,
        id: action.payload
      }
    },
    updateDeleteId: (state, action) => {
      return {
        ...state,
        deleteId: action.payload
      }
    },
  }
});

export const { getCategoriesArtist, updateCategoryColor, updateCategoryDescription, updateCategoryCurrentId, updateCategoryName, updateDeleteId } = categoriesArtistSlice.actions;
export default categoriesArtistSlice.reducer;
