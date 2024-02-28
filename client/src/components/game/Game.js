import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import io from "socket.io-client";
const socket = io("http://localhost:8080", {
  withCredentials: true,
})

export default function Game() {
    const { id: gameID } = useParams()
    let search = window.location.search
    let params = new URLSearchParams(search);
    let quizID = params.get('quizID');
    const [connectedPlayers, setConnectedPlayers] = useState(0);
    console.log(useLocation())

    useEffect(() => {
      socket.on("count_players", (data) => {
        setConnectedPlayers(data)
      })
      socket.on("request_data", () => {
        socket.emit("send_data", ({ "gameID": gameID, "quizID": quizID, "host":true }))
      })
    }, [socket])

    useEffect(() => {
      return () => {
        socket.disconnect()
      }
    }, [])

  return (
    <div>
      <section className='bg-[#fdbe3f] w-screen h-screen absolute'>
        <div className='position-relative mt-[6.5%] h-[80px]'>
        <h1 className='text-[#F6EFD9] font-["Tungsten-Bold"] lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>GAME ID: {gameID}</h1>
        </div>
        <div className='position-relative'>
        <h1 className='text-[#F6EFD9] font-["Tungsten-Bold"] lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>PLAYERS CONNECTED: {connectedPlayers}</h1>
        </div>
        
      </section>
    </div>
  )
}
