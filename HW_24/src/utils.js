export const randomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}`;

export const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
