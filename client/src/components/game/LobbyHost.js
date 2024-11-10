import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import io from "socket.io-client";
import GameInstance from './InstanceHost';
import AuthService from '../../services/auth.service';
import InstanceHost from './InstanceHost';
import Transition from './Transition';


const socket = io("https://7jp85kmx-3000.euw.devtunnels.ms", { withCredentials: true });

export default function LobbyHost() {
    const search = window.location.search
    const params = new URLSearchParams(search);
    const quizID = params.get('quizID');
    const role = params.get('role');
    const [connectedPlayers, setConnectedPlayers] = useState(0);
    const [state, setState] = useState(0);
    const [stateData, setStateData] = useState({state: 0});
    const [error, setError] = useState(undefined);
    const [gameID, setGameID] = useState(null);

    useEffect(() => {
      setState(stateData.state);
    }, [stateData])

    useEffect(() => {
      socket.on("exception", (exception) => {
        setError(exception.message)
        if (exception.message === "Game Not Found") {
          localStorage.removeItem("socketSessionData");
        }
      })
      socket.on("connect_error", (err) => {
        if (err.message === "Invalid Access Token!") {
          socket.on("exception", (exception) => {
            setError(exception.message)
          })
          console.log("Failed once");
          AuthService.refreshToken().then((res) => {socket.connect();})
          .catch((err) => {
            console.log(err)
            setError("token_error"); 
        })
        }
      });
      socket.on("count_players", (data) => {
        console.log(data);
        setConnectedPlayers(data);
      })
      socket.on("request_data", () => {
        socket.emit("send_data", ({ quizID: quizID, role: role, sessionData: JSON.parse(localStorage.getItem("socketSessionData")) }))
      })
      socket.on("send_gameid", (data) => {
        setGameID(data);
      })
      socket.on("send_state_data", (data) => {
        setStateData(data);
      } )
      socket.on("store_session_data", (data) => {
        localStorage.setItem("socketSessionData", JSON.stringify(data));
      })
    }, [socket])

    const test = (data) => {
      socket.emit("test_emission", data);
    }

    useEffect(() => {
      if (JSON.parse(localStorage.getItem("socketSessionData"))) {setGameID(JSON.parse(localStorage.getItem("socketSessionData")).gameID)}
      return () => {
        socket.disconnect()
      }
    }, [])

    const start = () => {
      socket.emit("start_game");
    }

    const tokenlessReconnection = () => {
      socket.io.opts.query = {
        notSignedin: true
      }
      setError(null);
      socket.connect();
    }

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

    const renderLobby = () => {
      return (
        <>
        <div className='position-relative mt-[6.5%] h-[80px]'>
        <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh]'>GAME ID: {gameID}</h1>
        </div>
        <div className='position-relative'>
        <h1 className='text-[#F6EFD9] font-Tungsten lg:text-[80px] h-[0vh]'>PLAYERS CONNECTED: {connectedPlayers}</h1>
        </div>
        <div className='position-relative mt-[6.5%] h-[80px]'>
        <button onClick={start} className='cursor-pointer text-[#F6EFD9] font-Tungsten text-[60px] h-[0vh]'>PLAY</button>
        </div>
        </>
      )
    }

    const renderState = (stateData) => {
      switch(stateData.state) {
        case 0:
          return (
            <>
            {renderLobby()}
            </>
          );
        case 1:
          return (
            <>
            <InstanceHost data={stateData.data} test={test}/>
            </>
          );
        case 2:
          return (
            <>
            <Transition data={stateData.data}/>
            </>
          )
      }
    }

  return (
    <div>
        <section className='bg-[#fdbe3f] w-screen h-screen absolute grid place-items-center'>
        {!(error) ? (<>{renderState({state: 2, data: {transitionDuration: 20}})}</>) : (
          <>
          {renderError()}
          </>
        )}
      </section>
    </div>
  )
}
