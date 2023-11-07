import React from 'react'
import { useParams } from 'react-router-dom';

export default function Game() {
    const { id: gameID } = useParams()
    let search = window.location.search
    let params = new URLSearchParams(search);
    let quizID = params.get('quizID');
    console.log(quizID)

  return (
    <div>
      <section className='bg-[#fdbe3f] w-screen h-[100vh] flex justify-center'>
      <h1 className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] lg:text-[80px] h-[0vh]'>GAME ID: {gameID}</h1>
      </section>
    </div>
  )
}
