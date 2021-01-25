const scoreToColor = (score) => {
  let r;
  let g;
  const b = 0;
  const perc = score * 100;
  if (perc < 50) {
    r = 255;
    g = Math.round(5.1 * perc);
  } else {
    g = 255;
    r = Math.round(510 - 5.10 * perc);
  }
  const h = r * 0x10000 + g * 0x100 + b * 0x1;
  return `#${(`000000${h.toString(16)}`).slice(-6)}`;
};

export default scoreToColor;
