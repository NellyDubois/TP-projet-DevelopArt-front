import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  firstname: '',
  lastname: '',
  phone: '',
  email: '',
  story: '',
  objectEmail: '',
  message: ''
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    handleSuccessfulSend: (state, action) => {
      return {
        ...state,
        message: action.payload,
      };
    },
    handleContactError: (state, action) => {
        return {
          ...state,
          message: action.payload,
        };
      },
    updateEmail: (state, action) => {
      return {
        ...state,
        email: action.payload,
      };
    },
    updateObjectEmail: (state, action) => {
      return {
        ...state,
        objectEmail: action.payload,
      };
    },
    updateFirstname: (state, action) => {
        return {
          ...state,
          firstname: action.payload,
        };
      },
      updateLastname: (state, action) => {
        return {
          ...state,
          lastname: action.payload,
        };
      },
      updateStory: (state, action) => {
        return {
          ...state,
          story: action.payload,
        };
      },
      updatePhone: (state, action) => {
        return {
          ...state,
          phone: action.payload,
        };
      },
  },
});

export const { handleSuccessfulSend, updateEmail, updateLastname, updatePhone, updateFirstname, updateStory, handleContactError, updateObjectEmail } =
  contactSlice.actions;
export default contactSlice.reducer;
