import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  list: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    updateCategory: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
});

export const { updateCategory } = categorySlice.actions;

export default categorySlice.reducer;
