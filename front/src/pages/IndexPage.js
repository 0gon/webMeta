import DefaultLayout from "../layouts/DefaultLayout";
import '../css/indexPage.css';
import React, { useState, useEffect, useRef } from 'react';
import $ from 'jquery';

let keyDownFlag = {
  ArrowUp: false,
  ArrowRight: false,
  ArrowDown: false,
  ArrowLeft: false,
};
let imgUrl = "/img/front.png";

const IndexPage = () => {


  useEffect(() => {

    const handleKeyDownChgImg = (event) => {
      let key = event.key;
      if (key === "ArrowUp") {
        imgUrl = "/img/back.png";
      }
      if (key === "ArrowRight") {
        imgUrl = "/img/right.png";
      }
      if (key === "ArrowDown") {
        imgUrl = "/img/front.png";
      }
      if (key === "ArrowLeft") {
        imgUrl = "/img/left.png";
      }
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

    let bgW = bg.width()
    let bgH = bg.height()

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

    //todo 플래그 구성 잘못됨. 키 꾹 누를시에 계속 동작되는중
    // 랜더링시에 기존 raf 가 종료 안되고 랜더링되어서 다시 키 입력되는거 같음
    const handleKeyDown = (event) => {
      let key = event.key;
      if (keyDownFlag[key] === false) {
        keyDownFlag[key] = !keyDownFlag[key];
        console.log(keyDownFlag[key])

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
        console.log(keyDownFlag[key])

        if (key === "ArrowUp") {
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

    window.addEventListener('keydown', handleKeyDownChgImg);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {

      window.addEventListener('keydown', handleKeyDownChgImg);

      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);


  return (
    <DefaultLayout>
      <div className="map">
        <img className="background" src={`${process.env.PUBLIC_URL}/img/back2.png`} alt="noImg"></img>
        <div className="screen">
          <div className="crt">
            <img src={`${process.env.PUBLIC_URL}${imgUrl}`} alt=""></img>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

export default IndexPage;