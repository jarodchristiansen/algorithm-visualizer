const pause = async (speed: number) => {
  
  return new Promise((resolve) => {
    setTimeout(() => {

      resolve('N/A');
    }, 450 / speed);
  });
};

export default pause;
