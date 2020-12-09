import React,{useState,useEffect} from "react"
import {ball} from "./Ball.module.css"
const N = 20
let FPS = 300 
const Ball = ()=>{
  const [ballPos,setBallPos]= useState({
    x:300,
    y:window.innerHeight,
    angle:155,
    running:false,
    interval:null
  })
 
  useEffect(()=>{
    let ballSize = getComputedStyle(document.body).getPropertyValue("--ball-size")
    ballSize = ballSize.slice(0,ballSize.length-2)
    const ballPosHandler = ()=>{
     setBallPos(prev=>{
      let updatedAngle = prev.angle
      if(prev.x < 0 + (ballSize * 10 / 2)){
        console.log("less then 0")
          updatedAngle = 180 - prev.angle;
      }
      if(prev.x > window.innerWidth - (ballSize*10/2)){
        console.log("greater then 0")
        updatedAngle = 180 - prev.angle; 
      }

      return{
        ...prev,
        angle:updatedAngle,
        y:prev.y - (Math.sin(prev.angle * (Math.PI / 180)) * N),
        x:prev.x + (Math.cos(prev.angle * (Math.PI / 180)) * N)
      }
    })
  }

     let id = setInterval(ballPosHandler,FPS)
    return ()=> clearInterval(id)
  },[ballPos])


  return(
     <div className={ball} style={{left:`${ballPos.x}px`,top:`${ballPos.y}px`}}></div>
  )
}

export default Ball