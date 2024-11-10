import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import io from "socket.io-client";
import GameInstance from './InstanceHost';
import AuthService from '../../services/auth.service';


const socket = io(process.env.REACT_APP_LOCALHOST, { withCredentials: true });

export default function GameLobbyPlayer() {
    const [connectedPlayers, setConnectedPlayers] = useState(0);
    const [instance, setInstance] = useState(false);
    const [error, setError] = useState(undefined);
    const { id: gameID } = useParams();

    useEffect(() => {
      socket.on("exception", (exception) => {
        setError(exception.message)
      })
      socket.on("connect_error", (err) => {
        if (err.message === "Invalid Access Token!" || err.message === "Invalid Session Data!") {
          console.log("Failed once");
          AuthService.refreshToken().then((res) => {socket.connect();})
          .catch((err) => {
            console.log(err);
            setError("token_error");
        })
        }
      });
      socket.on("count_players", (data) => {
        console.log(data);
        setConnectedPlayers(data);
      })
      socket.on("request_data", () => {
        console.log(JSON.parse(localStorage.getItem("socketSessionData")));
        socket.emit("send_data", ({ role: 'player', gameID: gameID, sessionData: JSON.parse(localStorage.getItem("socketSessionData")) }))
      })
      socket.on("store_session_data", (data) => {
        localStorage.setItem("socketSessionData", JSON.stringify(data));
      })
    }, [socket])

    useEffect(() => {
      return () => {
        socket.disconnect()
      }
    }, [])

    const tokenlessReconnection = () => {
      socket.io.opts.query = {
        notSignedin: true
      }
      setError(null);
      socket.connect();
    }

    useEffect(() => {
      console.log(error);
    }, [error])

    const renderError = () => {
      switch(error) {
        case "token_error":
          return (
            <>
            <div className='position-relative mt-[6.5%] h-[80px]'>
            <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>Failure to connect with account</h1>
            </div>
            <div className='position-relative mt-[6.5%] h-[80px]'>
            <h1 onClick={tokenlessReconnection} className='cursor-pointer text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>Reconnect without account?</h1>
            </div>
            </>
          );
          default:
            return (
              <>
              <div className='position-relative mt-[6.5%] h-[80px]'>
              <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>{error}</h1>
              </div>
              </>
            );
      }
    }

  return (
    <div>
      {!instance ? (
          <section className='bg-[#fdbe3f] w-screen h-screen absolute'>
          {!(error) ? (<>
          <div className='position-relative mt-[6.5%] h-[80px]'>
          <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>GAME ID: {gameID}</h1>
          </div>
          <div className='position-relative'>
          <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh] absolute -translate-x-1/2 -translate-y-1/2 left-1/2'>PLAYERS CONNECTED: {connectedPlayers}</h1>
          </div>
          </>) : (
            <>
            {renderError()}
            </>
          )}
        </section>
      ) : (
        <GameInstance/>
      )}

    </div>
  )
}
