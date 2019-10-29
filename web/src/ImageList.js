import React from 'react';

const ImageList = ({ images }) => {

  return images.map((image) => {
    console.log(image);
    return <img src={`${image.url}/${image.id}/${image.width}/${image.height}`} />;
  });
};

export default ImageList;
