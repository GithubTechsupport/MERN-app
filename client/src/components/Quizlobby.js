import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShortUniqueID from 'short-unique-id';

export default function Quizlobby() {
  var search = window.location.search
  var params = new URLSearchParams(search);
  var quizID = params.get('quizID');
  const uid = new ShortUniqueID();
  

  return (
    <>
    <section className='bg-[#fdbe3f] w-screen h-[100vh] flex justify-center'>
      <Link reloadDocument className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[70px] h-[0vh]' to={{pathname: `/game/${uid.rnd()}`, search: `?quizID=${quizID}`}} state={{ hosting: true }}>Create lobby</Link>
    </section>  
    </>
  )
}
