export const calcSL = (price, atr, multiplier) => {
  return price - (atr * multiplier);
}

export const calcTarget = (price, atr, multiplier) => {
  return price + (atr * multiplier);
}

export const calcFixedSL = (price, pct = 0.2) => {
  return price - (price * pct);
}
