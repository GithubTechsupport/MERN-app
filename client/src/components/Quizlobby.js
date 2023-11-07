import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

export default function Quizlobby() {
    let search = window.location.search
    let params = new URLSearchParams(search);
    let quizID = params.get('quizID');
    console.log(quizID)

  return (
    <>
    <section className='bg-[#fdbe3f] w-screen h-[100vh] flex justify-center'>
      <Link className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] lg:text-[80px] h-[0vh]' to={{pathname: `/game/${uuidv4()}`, search: `?quizID=${quizID}`}}>Create lobby</Link>
    </section>  
    </>
  )
}
