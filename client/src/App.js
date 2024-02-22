import React, { useState, useEffect, useRef } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import logowhite from './images/forretningslogo.png';
import logooffwhite from './images/forretningslogo-offwhite.png';
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";

// import AuthVerify from "./common/AuthVerify";
import EventBus from "./common/EventBus";
import Faq from "./components/Faq";
import Quizsite from "./components/Quizsite";
import CreateQuiz from "./components/CreateQuiz";
import Quizlobby from "./components/Quizlobby";
import NoMatch from "./components/functionality/NoMatch";
import Game from "./components/game/Game";
import EditQuiz from "./components/EditQuiz";
import ErrorBoundary from "./components/functionality/ErrorBoundary";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [scrollPosition, setScrollPosition] = useState(0);
  const [logo, setLogo] = useState(logowhite);
  const [hasError, setHasError] = useState(false);

  const { pathname } = useLocation()
  const originalPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== originalPathname.current) {
      console.log(hasError);
      if (hasError) {
        setHasError(false);
      }
    }
  }, [pathname])

  useEffect(() => {
    const t = gsap.to(".navcontainer", {duration: .25, backgroundColor:"#F6EFD9", ease:"none", paused:true, reversed:true});
    const t2 = gsap.to(".headerbuttons", {duration: .1, color:"black", ease:"none", paused:true, reversed:true});
    const t3 = gsap.to(".logocircle", {duration: .25, backgroundColor:"black", ease:"none", paused:true, reversed:true});

    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      if (position < 100) {
        t.reverse()
        t2.reverse()
        t3.reverse()
        /*setLogo(logo1)*/
      } else {
        t.play()
        t2.play()
        t3.play()
        /*setLogo(logosirkel)*/
      }
  };

    window.addEventListener('scroll', handleScroll, { passive: true });


    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      AuthService.refreshToken()
    }
    console.log()
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div>
    <header className="primary">
        <div className="navcontainer">
            <section className="navsection">
                <nav className="primarynav">
                    <ul>
                        <Link to={"/home"} className="nav-link headerbuttons"><i className="fa-solid fa-house"></i> Home</Link>
                        <Link to={"/quiz"} className="nav-link headerbuttons"><i className="fa-solid fa-comment"></i> Categories</Link>
                        <Link to={"/faq"} className="nav-link headerbuttons"><i className="fa-solid fa-circle-info"></i> FAQ</Link>
                    </ul>
                </nav>
                <div className="logocontainer">
                  <div className="logocircle"></div>
                  <img src={logo} alt="LOGO"/>
                </div>
                <nav className="accountnav">
                    <ul>
                        <Link to={"/support"} className="nav-link headerbuttons"><i className="fa-solid fa-bell-concierge"></i> Support</Link>
                        <Link to={"/shopping"} className="nav-link headerbuttons"><i className="fa-solid fa-cart-shopping"></i> Cart</Link>
                        {currentUser ? (
                        <>
                        <Link to={"/profile"} className="nav-link headerbuttons"><i className="fa-solid fa-user"></i> {currentUser.username}</Link>
                        <a href="/login" style={{color: "rgb(246, 239, 217)"}} className="nav-link headerbuttons" onClick={logOut}> Log out</a>
                        </>
                          ) : (
                        <>
                        <Link to={"/login"} className="nav-link headerbuttons"> Login</Link>
                        <Link to={"/register"} className="nav-link headerbuttons"> Sign Up</Link>
                        </>
                        )}
                    </ul>
                </nav>
            </section>
        </div>
    </header>
      <div>
        <ErrorBoundary setHasError={setHasError} hasError={hasError}>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/quiz"} element={<Quizsite />} />
          <Route exact path={"/createquiz"} element={<CreateQuiz />} />
          <Route exact path={"/faq"} element={<Faq />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path={"/lobby"} element={<Quizlobby />} />
          <Route exact path={"/editquiz"} element={<EditQuiz />} />
          <Route path="/game/:id" element={<Game />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        </ErrorBoundary>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </div>
  );
};

export default App;
