import React from "react";
import Image from "next/image";
type ImageProps = {
  width?: number;
  height?: number;
};

const NotFoundImageContainer: React.FC<ImageProps> = ({ width, height }) => {
  return (
    <Image
      src="/img/404.jpeg"
      alt="Not found image"
      className="w-full h-96"
      width={width}
      height={height}
    />
  );
};

export default NotFoundImageContainer;
