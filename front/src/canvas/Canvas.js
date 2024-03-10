import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import useCanvas from "./useCanvas";

const width = 1500;
const height = 1000;
const background = `url(${process.env.PUBLIC_URL}/img/background.png)`;


const Canvas = () => {

  const canvasRef = useCanvas((canvas) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = background;
  });


  return (
    <DefaultLayout>
      <canvas ref={canvasRef} />
    </DefaultLayout>
  )
}

export default Canvas;