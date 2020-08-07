import tinycolor from "tinycolor2";

const getCorrectIndex = (number) => {
  if (number > 255) {
    return 255;
  }
  if (number < 0) {
    return 0;
  }
  return number > 255 ? 255 : number < 0 ? 0 : number;
};

const generateAvatar = (hash) => {
  const [r, g, b] = hash
    .substr(hash.length - 3, 3)
    .split("")
    .map((char) => getCorrectIndex(char.charCodeAt(0)));
  return {
    color: tinycolor({ r, g, b }).lighten(12).saturate(120).toHexString(),
  };
};

export default generateAvatar;
