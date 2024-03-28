const artworkHomepageUpdateMiddleware = (store) => (next) => (action) => {
  if (action.type === 'UPDATE_ARTWORK_HOMEPAGE') {
    const id = store.getState().artworkHomepage.id;
    const categoryNames = store.getState().artworkHomepage.categoryNames; 
    
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/oeuvres/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().artist.token}`,
      },
      body: JSON.stringify({
        name: store.getState().artworkHomepage.name,
        description: store.getState().artworkHomepage.description,
        production_year: store.getState().artworkHomepage.productionYear,
        technique: store.getState().artworkHomepage.technique,
        width: store.getState().artworkHomepage.width,
        height: store.getState().artworkHomepage.height,
        media: store.getState().artworkHomepage.media,
        framing: store.getState().artworkHomepage.framing,
        quote: store.getState().artworkHomepage.quote,
        orientation: store.getState().artworkHomepage.orientation,
        categories: store.getState().artworkHomepage.categoryNames.join(',')
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("le retour du PATCH de l'oeuvre est", data);
      });
  }

  next(action);
};

export default artworkHomepageUpdateMiddleware;
