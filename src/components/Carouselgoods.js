import React, { Component } from "react";
import Carousel from 'react-bootstrap/Carousel';

import tetyana from '../IMG/tetyana.JPG'   //tetyana.JPG anatolii.JPG
import anatolii from '../IMG/anatolii.JPG'

function UncontrolledExample() {
  return (
    <Carousel className="d-block w-100">
      <Carousel.Item>
        <img
          
          src={anatolii}
          alt="First slide"
          width={'200px'}
          height={'200px'}
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
        
          src={tetyana}
          alt="Second slide"
          width={'200px'}
          height={'200px'}
        />


      </Carousel.Item>
      <Carousel.Item>
        <img
        
          src={anatolii}
          alt="Third slide"
          width={'200px'}
          height={'200px'}
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;