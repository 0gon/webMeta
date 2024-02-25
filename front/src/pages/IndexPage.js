import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

const IndexPage = () => {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("/img/front.png");

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
        crt: {
          up: null,
          right: null,
          down: null,
          left: null,
        },
        scr: {
          up: null,
          right: null,
          down: null,
          left: null,
        },
        scroll: {
          up: null,
          right: null,
          down: null,
          left: null,
        },
      }

      let map = $('.map');
      let scr = $('.screen');
      let bg = $('.background');
      let crt = $('.crt');;

      let pdW = (map.width() - scr.width()) / 2
      let pdH = (map.width() - scr.width()) / 2

      let mapW = map.width()
      let mapH = map.height()

      let mapST = map.scrollTop()
      let mapSL = map.scrollLeft()

      let bgW = bg.width() - crt.width()
      let bgH = bg.height() - crt.height()

      let scrW = scr.width() - crt.width()
      let scrH = scr.height() - crt.height()

      let scrT = parseInt(scr.css('top'));
      let scrL = parseInt(scr.css('left'));

      let crtT = parseInt(crt.css('top'));
      let crtL = parseInt(crt.css('left'));


      let speed = 5;


      let moveUp = () => {
        if (crtT > 0) {
          crtT -= speed;
          crt.css('top', `${crtT}px`);
          rafID.crt.up = requestAnimationFrame(moveUp);
        } else if (mapST > 0) {
          scrT -= speed;
          mapST = scrT - mapH / 2;
          map.scrollTop(mapST);
          scr.css('top', `${scrT}px`)
          rafID.scr.up = requestAnimationFrame(moveUp);
        } else if (scrT - pdH > 0) {
          scrT -= speed;
          scr.css('top', `${scrT}px`);
          rafID.scr.up = requestAnimationFrame(moveUp);
        }
      }

      let moveRight = () => {
        if (crtL < scrW) {
          crtL += speed;
          crt.css('left', `${crtL}px`);
          rafID.crt.right = requestAnimationFrame(moveRight);
        } else if (mapSL < bgW - mapW) {
          // 스크롤 이동
          scrL += speed;
          mapSL = scrL - mapW / 2;
          map.scrollLeft(mapSL);
          scr.css('left', `${scrL}px`);
          rafID.scr.right = requestAnimationFrame(moveRight);
        } else if (scrL + pdW < bgW) {
          scrL += speed;
          scr.css('left', `${scrL}px`);
          rafID.scr.right = requestAnimationFrame(moveRight);
        }
      }

      let moveDown = () => {
        if (crtT < scrH) {
          crtT += speed;
          crt.css('top', `${crtT}px`);
          rafID.crt.down = requestAnimationFrame(moveDown);
        } else if (mapST < bgH - mapH) {
          scrT += speed;
          mapST = scrT - mapH / 2;
          map.scrollTop(mapST);
          scr.css('top', `${scrT}px`);
          rafID.scr.down = requestAnimationFrame(moveDown);
        } else if (scrT + pdH < bgH) {
          scrT += speed;
          scr.css('top', `${scrT}px`);
          rafID.scr.down = requestAnimationFrame(moveDown);
        }
      }

      let moveLeft = () => {
        if (crtL > 0) {
          crtL -= speed;
          crt.css('left', `${crtL}px`);
          rafID.crt.left = requestAnimationFrame(moveLeft);
        } else if (mapSL > 0) {
          scrL -= speed;
          mapSL = scrL - mapW / 2;
          map.scrollLeft(mapSL);
          scr.css('left', `${scrL}px`);
          rafID.scr.left = requestAnimationFrame(moveLeft);
        } else if (scrL - pdW > 0) {
          scrL -= speed;
          scr.css('left', `${scrL}px`);
          rafID.scr.left = requestAnimationFrame(moveLeft);
        }
      }


      const handleKeyDown = (event) => {
        let key = event.key;
        if (keyDownFlag[key] === false) {
          keyDownFlag[key] = !keyDownFlag[key];
          if (key === "ArrowUp") {
            setImgUrl("/img/back.png");
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
            setImgUrl("/img/back.png");
            cancelAnimationFrame(rafID.crt.up);
            cancelAnimationFrame(rafID.scr.up);
            cancelAnimationFrame(rafID.scroll.up);
          }
          if (key === "ArrowRight") {
            cancelAnimationFrame(rafID.crt.right);
            cancelAnimationFrame(rafID.scr.right);
            cancelAnimationFrame(rafID.scroll.right);
          }
          if (key === "ArrowDown") {
            cancelAnimationFrame(rafID.crt.down);
            cancelAnimationFrame(rafID.scr.down);
            cancelAnimationFrame(rafID.scroll.down);
          }
          if (key === "ArrowLeft") {
            cancelAnimationFrame(rafID.crt.left);
            cancelAnimationFrame(rafID.scr.left);
            cancelAnimationFrame(rafID.scroll.left);
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
  }, [imgUrl]);


  return (
    <DefaultLayout>
      <div className="map">
        <img className="background" ref={imgRef} src={`${process.env.PUBLIC_URL}/img/back2.png`} alt=""></img>
        <div className="screen">
          <div className="crt">
            <img ref={imgRef} src={`${process.env.PUBLIC_URL}${imgUrl}`} alt=""></img>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default IndexPage;