import { createSlice } from '@reduxjs/toolkit';

// export const initialState = {
//       name: '',
//       description: '',
//       production_year: '',
//       technique: '',
//       height: '',
//       media: '',
//       framing: false,
//       path: '',
//       orientation: '',
//       position: 1,
//       homepage_flag: false,
//     };

export const initialState = {
  deleteId: '',
  list: [],
};

const artworkSlice = createSlice({
  name: 'artwork',
  initialState,

  reducers: {
    updateArtworkList: (state, action) => {
      return {
        ...state,
        list: action.payload,
      };
    },
    updateDeleteId: (state, action) => {
      return {
        ...state,
        deleteId: action.payload,
      }
    } 
  },

  // reducers: {
  //   updateArtworkName: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, name: action.payload };
  //   },
  //   updateArtworkDescription: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, description: action.payload };
  //   },
  //   updateArtworkYear: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, production_year: action.payload };
  //   },
  //   updateArtworkTechnique: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, technique: action.payload };
  //   },
  //   updateArtworkHeight: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, height: action.payload };
  //   },
  //   updateArtworkMedia: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, media: action.payload };
  //   },
  //   updateArtworkFraming: (state, action) => {

  //     return { ...state, framing: action.payload };
  //   },
  //   updateArtworkPath: (state, action) => {
  //     console.log(action.payload);
  //     return { ...state, path: action.payload };
  //   },
  //   updateArtworkOrientation: (state, action) => {

  //     return { ...state, orientation: action.payload };
  //   },
  //   updateArtworkPosition: (state, action) => {

  //     return { ...state, position: action.payload };
  //   },
  //   updateArtworkHomepageFlag: (state, action) => {

  //     return { ...state, homepage_flag: action.payload };
  //   },
  // },
});

export const {
  // updateArtworkName,
  // updateArtworkDescription,
  // updateArtworkYear,
  // updateArtworkTechnique,
  // updateArtworkHeight,
  // updateArtworkMedia,
  // updateArtworkFraming,
  // updateArtworkPath,
  // updateArtworkOrientation,
  // updateArtworkPosition,
  // updateArtworkHomepageFlag,
  updateArtworkList, updateDeleteId,
} = artworkSlice.actions;

export default artworkSlice.reducer;
