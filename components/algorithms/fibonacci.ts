


// Turns fibonacci sequence into steps to show that each first and second value totaled equals the following. 
export const fibonacci = async (array: number[], length: number) => {

  let moves = []
  
  for (let i = 0; i<length - 1; i++) {
    moves = [...moves, [array[i], array[i+1], array[i] + array[i+1]]]
  }


  return moves;
};
