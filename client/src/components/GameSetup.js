import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ShortUniqueID from 'short-unique-id';

export default function GameSetup() {
  var search = window.location.search
  var params = new URLSearchParams(search);
  var quizID = params.get('quizID');
  const uid = new ShortUniqueID();

  useEffect(() => {
    localStorage.removeItem("socketSessionData");
  }, [])

  return (
    <>
    <section className='bg-[#fdbe3f] w-screen h-[100vh] flex justify-center'>
      <Link reloadDocument className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[70px] h-[0vh]' to={{pathname: `/game`, search: `?quizID=${quizID}&role=host`}}>Create lobby</Link>
    </section>  
    </>
  )
}
