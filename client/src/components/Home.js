import React, { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./styling/home.css";
import UserService from "../services/user.service";
import CreateQuiz from "./CreateQuiz";

const Home = () => {
  const [content, setContent] = useState("");

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
    <section id="introduction" className="flex place-items-center justify-center">
      <Link to={"/createquiz"} className="text-white text-[75px] ">Create your quiz!</Link>
    </section>  
    <section id="information">
    </section>
    <div>
        <Routes>
          <Route exact path={"/createquiz"} element={<CreateQuiz />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
