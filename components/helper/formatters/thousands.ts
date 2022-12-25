export const numberWithCommas = (x, digits = 2) => {
    return x
      .toFixed(digits)
      .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };