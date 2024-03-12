import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import useCanvas from "./useCanvas";
import Character from "./Character";

const width = 1500;
const height = 1000;
const background = `url(${process.env.PUBLIC_URL}/img/background.png)`;


const Canvas = () => {
  let character = null;
  const canvasRef = useCanvas((canvas) => {
    console.log("canvas refing...")
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = background;
    character = new Character(canvas);
    document.addEventListener('keydown', character.handleArrowKeyDown);
    document.addEventListener('keyup', character.handleArrowKeyUp);
    
  });

  useEffect(() => {
    return () => {
      if (character) {
        document.removeEventListener('keydown', character.handleArrowKeyDown);
        document.removeEventListener('keyup', character.handleArrowKeyUp);
      }
    };
  }, []);


  return (
    <DefaultLayout>
      <canvas ref={canvasRef} />
    </DefaultLayout>
  )
}

export default Canvas;