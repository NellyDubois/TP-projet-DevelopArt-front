const artworkDeleteMiddleware = (store) => (next) => (action) => {
    if (action.type === 'DELETE_ARTWORK') {
        const id = store.getState().artwork.deleteId
      fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getState().artist.token}`,
        }
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('le retour de DELETE est', data);
        });
    }
    next(action);
  };
  
  export default artworkDeleteMiddleware;
  