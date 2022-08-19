export const priceFormat = (price: number = 0) =>
  new Intl.NumberFormat().format(price);
