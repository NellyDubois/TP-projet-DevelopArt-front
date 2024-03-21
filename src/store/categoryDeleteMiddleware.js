const categoryDeleteMiddleware = (store) => (next) => (action) => {
    if (action.type === 'DELETE_CATEGORY') {
        const id = store.getState().categoriesArtist.deleteId
      fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories/${id}`, {
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
  
  export default categoryDeleteMiddleware;
  