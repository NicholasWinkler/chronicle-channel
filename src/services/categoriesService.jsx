export const getAllCategories = () => {
  return fetch('http://localhost:3000/categories')
    .then(response => response.json());
};