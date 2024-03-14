import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  id: 1,
  font_type: 'Big Shoulders Stencil Display',
  background_color: 'black',
  background_color_nav: 'black',
  cursor: 'Arrow',
  font_color: 'white',
  layout: '1',
  facebook_flag: true,
  insta_flag: true,
  twitter_flag: true,
  youtube_flag: true,
  artist_id: 1,
  banner: 'https://picsum.photos/id/57/2448/3264',
  logo: `${process.env.REACT_APP_BASE_URL_BACK}/logos/logo-photo.png`,
  loading: true,
  cursor_path: '',
};

const configurationSlice = createSlice({
  name: 'configuration',
  initialState,
  reducers: {
    updateFont: (state, action) => {
      return {
        ...state,
        font_type: action.payload,
        loading: false,
      };
    },
    updateBackground: (state, action) => {
      return {
        ...state,
        background_color: action.payload,
        loading: false,
      };
    },
    updateBackgroundNav: (state, action) => {
      return {
        ...state,
        background_color_nav: action.payload,
        loading: false,
      };
    },
    updateColorFont: (state, action) => {
      return {
        ...state,
        font_color: action.payload,
        loading: false,
      };
    },
    updateCursor: (state, action) => {
      console.log('Updating cursor with URL:', action.payload);
      return {
        ...state,
        cursor: `url(${action.payload}), auto`,
        cursor_path: action.payload,
      };
    },
    updateBanner: (state, action) => {
      return {
        ...state,
        banner: action.payload,
      };
    },
    updateLogo: (state, action) => {
      return {
        ...state,
        logo: action.payload,
      };
    }
  },
});

export const { updateFont, updateBackground,updateBackgroundNav, updateColorFont, updateCursor, updateBanner, updateLogo } =
  configurationSlice.actions;

export default configurationSlice.reducer;
