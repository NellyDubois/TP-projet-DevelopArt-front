import { updateCategory } from './categorySlice';

const categoryMiddleware = (store) => (next) => (action) => {
  if (action.type === 'ALL_CATEGORY') {
    const categories_id = action.id;
    fetch(`${process.env.REACT_APP_BASE_URL_BACK}/1/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const action = updateCategory(data);
        store.dispatch(action);
      });
  }
  next(action);
};

export default categoryMiddleware;
