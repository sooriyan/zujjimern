import React from 'react';

const IframeComponent = () => {
  return (
    <iframe
      width='100%'
      height='700px'
      src='https://www.youtube.com/embed/66innK777fE'
      frameborder='0'
      allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture'
      allowfullscreen
    ></iframe>
  );
};

export default IframeComponent;
