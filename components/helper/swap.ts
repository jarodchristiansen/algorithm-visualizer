export const swap = async (array: number[], index1: number, index2: number) => {


  let cache = array[index1];
  array[index1] = array[index2];
  array[index2] = cache;
};
