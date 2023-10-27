import React, { useState, useEffect } from "react";
import "./styling/home.css";
import UserService from "../services/user.service";

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
    <section id="introduction">
    </section>  
    <section id="information">
    </section>
    </div>
  );
};

export default Home;