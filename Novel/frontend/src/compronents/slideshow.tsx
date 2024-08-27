import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './slideshow.css'


function Slider() {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
      <img id='pic' src='https://4kwallpapers.com/images/walls/thumbs_3t/9292.jpg'/>
        <Carousel.Caption>
          <h3 id='hd' >ชีวิตที่แสนเหงา</h3>
          <p id='pd'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
      <img id='pic' src='https://4kwallpapers.com/images/walls/thumbs_3t/9311.png'/>
        <Carousel.Caption>
          <h3 id='hd' >Second slide label</h3>
          <p id='pd'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img id='pic' src='https://4kwallpapers.com/images/walls/thumbs_3t/9254.jpg'/>
        <Carousel.Caption>
          <h3 id='hd' >Third slide label</h3>
          <p id='pd'>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;