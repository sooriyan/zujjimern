import React, { Fragment } from 'react';
import { Carousel } from 'react-bootstrap';
import DashboardQuery from '../dashboard/DashboardQuery';
const MainComponent = () => {
  return (
    <Fragment>
      <Carousel>
        <Carousel.Item>
          <img
            className='d-block w-100 '
            style={{ height: '600px' }}
            src={`${process.env.PUBLIC_URL}slideshow/housemodel.jpg`}
            alt='First slide'
          />
          <Carousel.Caption>
            <h3>We Provide Models</h3>
            <p>We will design you the house model you require</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            style={{ height: '600px' }}
            src={`${process.env.PUBLIC_URL}slideshow/houseplan.jpg`}
            alt='Third slide'
          />
          <Carousel.Caption>
            <h3>Work With Us</h3>
            <p>To Get a Clear View On Your Dream House</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            style={{ height: '600px' }}
            src={`${process.env.PUBLIC_URL}slideshow/houseplan2.jpg`}
            alt='Third slide'
          />

          <Carousel.Caption>
            <h3>Provide Plans</h3>
            <p>And Help Us Visualize What You Need.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <br />
      <DashboardQuery />
    </Fragment>
  );
};

export default MainComponent;
