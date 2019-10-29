import React, { Component } from 'react';
import ImageList from './ImageList';

class Gallery extends Component {
  state = {
    images: []
  };

  componentDidMount() {
    fetch(`http://localhost:9292/api/v1/images`)
      .then((res) => res.json())
      .then((data) => this.setState({ images: data }));
  }

  render() {
    const { images } = this.state;
    console.log('data', images);

    if (!images) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h3>Picsum Gallery</h3>
        <ImageList images={images} />
      </div>
    );
  }
}

export default Gallery;
