import React, { useState, useEffect, useRef, lazy, Suspense, useTransition } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import "bootstrap/dist/css/bootstrap.min.css";
import logowhite from './images/forretningslogo.png';
import logooffwhite from './images/forretningslogo-offwhite.png';
import "./App.css";

import AuthService from "./services/auth.service";

/* import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import Faq from "./components/Faq";
import Quizsite from "./components/Quizsite";
import CreateQuiz from "./components/CreateQuiz";
import Quizlobby from "./components/Quizlobby";
import Game from "./components/game/Game";
import EditQuiz from "./components/EditQuiz";
 */
import EventBus from "./common/EventBus";
import ErrorBoundary from "./components/functionality/ErrorBoundary";
import NoMatch from "./components/functionality/NoMatch";
import Navbar from "./components/Navbar";

const Login = lazy(() => import("./components/Login"))
const Register = lazy(() => import("./components/Register"))
const Home = lazy(() => import("./components/Home"))
const Profile = lazy(() => import("./components/Profile"))
const Faq = lazy(() => import("./components/Faq"))
const Quizsite = lazy(() => import("./components/Quizsite"))
const CreateQuiz = lazy(() => import("./components/CreateQuiz"))
const GameSetup = lazy(() => import("./components/GameSetup"))
const Game = lazy(() => import("./components/game/Game"))
const EditQuiz = lazy(() => import("./components/EditQuiz"))
const GameLobbyPlayer = lazy(() => import("./components/game/GameLobbyPlayer"))

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [hasError, setHasError] = useState(false); 
  const [ongoingGame, setOngoingGame] = useState(Boolean(JSON.parse(localStorage.getItem("socketSessionData"))));

  const { pathname } = useLocation()
  const originalPathname = useRef(pathname)

  useEffect(() => {
    if (pathname !== originalPathname.current) {
      console.log(hasError);
      setOngoingGame(Boolean(JSON.parse(localStorage.getItem("socketSessionData"))))
      if (hasError) {
        setHasError(false);
      }
    }
  }, [pathname])

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      AuthService.refreshToken();
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  const leaveOngoingGame = () => {
    localStorage.removeItem("socketSessionData");
    setOngoingGame(false);
  }

  return (
    <>
      <Navbar/>
      {!ongoingGame ? (<></>) : (<div className="p-[3px] w-[20vw] h-[75px] bg-[yellow] fixed bottom-0 right-0 rounded-2xl">
      <Link reloadDocument className='text-[15px]' to={{pathname: `/game`, search: `?role=host`}}>Ongoing game found! Click to join</Link>
      <div className="text-[15px]">|</div>
      <div className="text-[15px] cursor-pointer" onClick={leaveOngoingGame}>Click to leave</div>
      </div>)}
      <div>
        <ErrorBoundary setHasError={setHasError} hasError={hasError}>
        <Suspense fallback={<h2>Loading...</h2>}>
        <Routes>
          <Route exact path={"/"} element={<Home />} />
          <Route exact path={"/home"} element={<Home />} />
          <Route exact path={"/quiz"} element={<Quizsite />} />
          <Route exact path={"/createquiz"} element={<CreateQuiz />} />
          <Route exact path={"/faq"} element={<Faq />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path={"/setupgame"} element={<GameSetup />} />
          <Route exact path={"/editquiz"} element={<EditQuiz />} />
          <Route path="/game" element={<Game />} />
          <Route path="/lobby/:id" element={<GameLobbyPlayer />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
        </Suspense>
        </ErrorBoundary>
      </div>

      {/* <AuthVerify logOut={logOut}/> */}
    </>
  );
};

export default App;
