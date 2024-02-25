import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

const IndexPage = () => {
  const imgRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    img.onload = () => {





      const keyDownFlag = {
        ArrowUp: false,
        ArrowRight: false,
        ArrowDown: false,
        ArrowLeft: false,
      }

      const rafID = {
        up: null,
        right: null,
        down: null,
        left: null,
      }

      let scr = $('.screen');
      let crt = $('.crt');

      let scrW = scr.width() - crt.width();
      let scrH = scr.height() - crt.height(); 

      let crtT = parseInt(crt.css('top'));
      let crtL = parseInt(crt.css('left'));


      let moveUp = () => {
        if (0 < crtT) {
          crtT--;
        }
        $('.crt').css('top', `${crtT}px`);
        rafID.up = requestAnimationFrame(moveUp);
      }

      let moveRight = () => {
        if (crtL < scrW) {
          crtL++;
        }
        $('.crt').css('left', `${crtL}px`);
        rafID.right = requestAnimationFrame(moveRight);
      }

      let moveDown = () => {
        if (crtT < scrH) {
          crtT++;
        }
        $('.crt').css('top', `${crtT}px`);
        rafID.down = requestAnimationFrame(moveDown);
      }

      let moveLeft = () => {
        if (0 < crtL) {
          crtL--;
        }
        $('.crt').css('left', `${crtL}px`);
        rafID.left = requestAnimationFrame(moveLeft);
      }


      const handleKeyDown = (event) => {
        let key = event.key;
        if (keyDownFlag[key] === false) {
          keyDownFlag[key] = !keyDownFlag[key];
          if (key === "ArrowUp") {
            requestAnimationFrame(moveUp);
          }
          if (key === "ArrowRight") {
            requestAnimationFrame(moveRight);
          }
          if (key === "ArrowDown") {
            requestAnimationFrame(moveDown);
          }
          if (key === "ArrowLeft") {
            requestAnimationFrame(moveLeft);
          }
        };
      };

      const handleKeyUp = (event) => {
        let key = event.key;
        if (keyDownFlag[key] === true) {
          keyDownFlag[key] = !keyDownFlag[key];
          if (key === "ArrowUp") {
            cancelAnimationFrame(rafID.up);
          }
          if (key === "ArrowRight") {
            cancelAnimationFrame(rafID.right);
          }
          if (key === "ArrowDown") {
            cancelAnimationFrame(rafID.down);
          }
          if (key === "ArrowLeft") {
            cancelAnimationFrame(rafID.left);
          }
        };
      };


      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        window.removeEventListener('keyup', handleKeyUp);
      };
    };
  }, []);


  return (
    <DefaultLayout>
      <div className="background">
        <div className="screen">
          <div className="crt">
            <img ref={imgRef} src={`${process.env.PUBLIC_URL}/img/front.png`} alt=""></img>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default IndexPage;