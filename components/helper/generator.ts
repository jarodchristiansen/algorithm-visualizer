const generator = (length: number) => {
  let list = [];
  let min = 1,
    max = 100;
  for (let counter = 0; counter < length; ++counter) {
    let num = Math.floor(Math.random() * (max - min + 1) + min);
    // @ts-ignore: TODO
    list.push({ key: parseInt(num), classType: 0 });
  }
  return list;
};

export default generator;
