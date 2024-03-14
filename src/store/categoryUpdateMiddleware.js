const categoryUpdateMiddleware = (store) => (next) => (action) => {
    if (action.type === 'UPDATE_CATEGORY') {
        const id = store.getState().categoriesArtist.id
      fetch(`http://localhost:3000/1/categories/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${store.getState().artist.token}`,
        },
        body: JSON.stringify({
          name: store.getState().categoriesArtist.name,
          description: store.getState().categoriesArtist.description,
          color : store.getState().categoriesArtist.color,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('le retour de PATCH est', data);
        });
    }
    next(action);
  };
  
  export default categoryUpdateMiddleware;
  