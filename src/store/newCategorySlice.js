import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  name: '',
  color: '',
  description: ''
};

const newCategorySlice = createSlice({
  name: 'newCategory',
  initialState,

  reducers: {
    newCategoryName: (state, action) => {
      return {
        ...state,
        name: action.payload,
      };
    },
    newCategoryColor: (state, action) => {
      return {
        ...state,
        color: action.payload,
      };
    },
    newCategoryDescription: (state, action) => {
      return {
        ...state,
        description: action.payload,
      };
    },
  },
});

export const { newCategoryName, newCategoryColor, newCategoryDescription } = newCategorySlice.actions;

export default newCategorySlice.reducer;
