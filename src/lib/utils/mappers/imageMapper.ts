const mapImage = (img: string | null, fallback: string) => {
  return img
    ? img.startsWith("http")
      ? img
      : `https://mixyboos.twic.pics/${img}?twic=v1/resize=256`
    : fallback;
};
export default mapImage;
