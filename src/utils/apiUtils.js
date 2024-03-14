import { handleFetchErrors } from './errorUtils';

export const uploadArtworkToServer = async (formDataToSend) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/telechargement-oeuvre`, {
        method: 'POST',
        body: formDataToSend,
        
  });

  return handleFetchErrors(response);
};