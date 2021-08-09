const findById = (id, array) => {
  return array.filrer((item) => item.id === id);
};
export default findById;
