import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';
import useCanvas from "../pages/useCanvas";
// import background from `${process.env.PUBLIC_URL}/img/back2.png`;

const width = 1500;
const height = 1000;


const Canvas = () => {

  const canvasRef = useCanvas((canvas) => {
    canvas.width = width;
    canvas.height = height;
    canvas.style.background = `url(${process.env.PUBLIC_URL}/img/back2.png)`;
  });


  return (
    <DefaultLayout>
      <p>hihi</p>
      <canvas ref={canvasRef} />
    </DefaultLayout>
  )
}

export default Canvas;