import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styling/home.css";
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");
  const [gameID, setGameID] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div id="background">
    <section id="introduction" className="flex flex-col place-items-center justify-center">
      <input placeholder="Enter GameID" onChange={(e) => {setGameID(e.target.value)}} value={gameID}></input>
      <Link reloadDocument onClick={() => {
        const sessionData = JSON.parse(localStorage.getItem("socketSessionData"));
        if (sessionData != null && (sessionData.expireAt < new Date().getTime() || sessionData.gameID != gameID || sessionData.role === "host")) {
          localStorage.removeItem("socketSessionData")
          console.log("test")
        }
      }} to={{pathname: `/lobby/${gameID}`}} className="text-white text-[75px] ">Join Game</Link>
    </section>  
    <section id="information">
    </section>
    </div>
  );
};

export default Home;
