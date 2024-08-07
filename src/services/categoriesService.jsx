export const getCategories = () => {
  return fetch("http://localhost:3000/categories")
    .then((res) => res.json());
}