import React from 'react';
import PropTypes from 'prop-types';

const ImageListItem = ({ url, id, width, height }) => {
  return (
    <div>
      <img alt='picsum' src={`${url}/${id}/${width}/${height}`} />
    </div>
  );
};

const ImageList = ({ images }) => {
  return images.map((image) => {
    return (<ImageListItem key={image.id} {...image} />);
  });
};

ImageList.propTypes = {
  images: PropTypes.array.isRequired
};

ImageListItem.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
};

export default ImageList;
