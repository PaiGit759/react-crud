import React from "react";
import {useState} from "react";
import Carousel from 'react-bootstrap/Carousel';

import Generic from '../IMG/Generic.jpg'   
import Adele from '../IMG/Adele.JPG'
import Vinil from '../IMG/Vinil.jpg'

import "../css/Carouselgoods.css";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Adele}
          alt="First slide"
          
        />
        <Carousel.Caption>
          <h3>CD</h3>
      <p>Large selection of CD</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Generic}
          alt="Second slide"
          

        />

        <Carousel.Caption>
        <h3 id="music-equipment">Music equipment</h3>
      <p id="equipment">Large selection of music equipments</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Vinil}
          alt="Third slide"
          
        />

        <Carousel.Caption>
        <h3>DVD</h3>
      <p>Large selection of DVD</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}




function UncontrolledExample() {
  return (
    <div className="ContainerCarousel">
        <ControlledCarousel/>
    </div>
  );
}

export default UncontrolledExample;