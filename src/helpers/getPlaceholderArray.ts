export const getPlaceholderArray = (count: number) => {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(i + 1);
  }
  return arr;
};
