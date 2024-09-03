"use client";
import { useState,useRef,useEffect,ChangeEvent } from "react";
import { Button } from "./button";
import { Input } from "./input";
import { Duru_Sans } from "next/font/google";

 export default function Countdown(){
const [duration,setDuration]=useState<number|string>("")
const [timeleft,setTimeLeft]=useState<number>(0)
const [isActive,setIsActive]=useState<boolean>(false)
const [isPaused,setPaused]=useState<boolean>(false)
const timerRef=useRef<NodeJS.Timeout|null>(null)


const handleSetDuration=():void=>{
if(typeof duration === "number" && duration>0){
    setTimeLeft(duration)
    setIsActive(false)
    setPaused(false)
    if(timerRef.current){
        clearInterval(timerRef.current)
    }
}
}

const handleStart=():void=>{
    if(timeleft>0){
        setIsActive(true)
      setPaused(false)
    }
}

const handlePause=():void=>{
    if(isActive){
        setPaused(true)
        setIsActive(false)
        if(timerRef.current){
            clearInterval(timerRef.current)
        }
    }
}

const handleReset=():void=>{
   setIsActive(false)
   setPaused(false)
   setTimeLeft(typeof duration === "number" ? duration : 0)
   if(timerRef.current){
    clearInterval(timerRef.current)
   }
}

useEffect(()=>{
    if(isActive && !isPaused){
    timerRef.current=setInterval(()=>{
        setTimeLeft((prevTime)=>{
            if(prevTime<=1){
                clearInterval(timerRef.current!)
                return 0;
            }
           return prevTime-1;
        });
     },1000)
}
 return ()=>{
    if(timerRef.current){
        clearInterval(timerRef.current)
    }
}
},[isActive,isPaused]);

 const formatTime=(time:number):string=>{
    const minutes=Math.floor(time/60);
    const seconds=time%60;
    return (
      `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`
    );
 }

const handleDurationChange=(e:ChangeEvent<HTMLInputElement>):void =>{
 setDuration(Number(e.target.value) || "");
}

return(
 <div className="flex flex-col items-center justify-center h-screen bg-gray-200 datk:bg-gray-900">
 <div className="bg-gray-900 dark:bg-gray-200 shadow-5g rounded-xl p-10 w-full max-w-md">
  <div className="flex justify-center mb-2">
    <img src="https://images.vexels.com/media/users/3/128840/isolated/preview/c091629800ce3d91d8527d32d60bc46f-stopwatch-timer.png" alt="" className="w-20 h-20" />
  </div>
  <h1 className="text-3xl font-bold mb-8 text-gray-200 dark:text-gray:900 text-center ">Countdown Timer</h1>
  <div className="flex items-center mb-8">
     <Input
       type="number"
       id="duration"
       placeholder="Enter duration in seconds"
       value={duration}
       onChange={handleDurationChange}
       className="flex-1 mr-4 rounded-md dark:border-gray-600 dark:bg-gray-200  text-gray-900 "/>  

       <Button
          onClick={handleSetDuration}
          variant="secondary"
          className="text-gray-900 bg-gray-200 dark:text-gray-900">
          Set
          </Button>
          </div>
          <div className="text-7xl font-bold text-gray-200 dark:text-gray-900 mb-8 text-center">
          {formatTime(timeleft)}
        </div>
        <div className="flex justify-center gap-7">
            <Button
            onClick={handleStart}
            variant="secondary"
            className="text-gray-900 bg-gray-200 dark:text-gray-900"
            >
            Start
            </Button>
            <Button
             onClick={handlePause}
             variant="secondary"
             className="text-gray-900 bg-gray-200 dark:text-gray-900"
            >
            Pause
            </Button>
            <Button
             onClick={handleReset}
             variant="secondary"
             className="text-gray-900 bg-gray-200 dark:text-gray-900"
            >
            Reset
            </Button>
        </div>
 </div>
 </div>

)

}