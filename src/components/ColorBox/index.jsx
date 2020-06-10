import React, { useState } from "react";
import PropTypes from "prop-types";
import './ColorBox.scss'

ColorBox.propTypes = {};

function getRandomColor() {
  const COLOR_LIST = ['blue', 'black' , 'yellow'];
  const randomIndex = Math.trunc(Math.random()*3);
  return COLOR_LIST[randomIndex];
}

function ColorBox() {
  const [color, setColor] = useState(()=> {
    return localStorage.getItem('box-color') || 'deeppink'
  });

  function handleBoxClick() {
    const newColor = getRandomColor();
    setColor(newColor);
    localStorage.setItem('box-color', newColor);
  }
  return (
    <div 
      className="color-box" 
      style={{ backgroundColor: color }}
      onClick={handleBoxClick}
      >
    </div>
  );
}

export default ColorBox;
