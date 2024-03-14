import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  list: [],
};

const detailsSlice = createSlice({
  name: 'details',
  initialState,

  reducers: {
    updateDetailsArtwork: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
  },
});

export const { updateDetailsArtwork } = detailsSlice.actions;

export default detailsSlice.reducer;
