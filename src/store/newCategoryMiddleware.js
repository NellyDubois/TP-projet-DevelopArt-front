const newCategoryMiddleware = (store) => (next) => (action) => {
  if (action.type === 'NEW_CATEGORY') {
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().artist.token}`,
      },
      body: JSON.stringify({
        name: store.getState().newCategory.name,
        description: store.getState().newCategory.description,
        color : store.getState().newCategory.color,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('le retour de POST est', data);
      });
  }
  next(action);
};

export default newCategoryMiddleware;
