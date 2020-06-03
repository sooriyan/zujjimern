import React from 'react';
import { Spinner } from 'react-bootstrap';
const Loader = () => {
  return (
    <Spinner animation='border' className='spinner_margin' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
};

export default Loader;
