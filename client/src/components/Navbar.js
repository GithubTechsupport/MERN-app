import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react"
import logowhite from '../images/forretningslogo.png';
import "../App.css"
import { useAuthContext } from './hooks/useAuthContext';
import { useSignout } from './hooks/useSignout';

export default function Navbar() {
  const [logo, setLogo] = useState(logowhite);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { user } = useAuthContext();
  const { signout, isLoading } = useSignout();
  const navcontainer = useRef()

  var t, t2, t3

  useGSAP(() => {
    t = gsap.to(".navcontainer", {duration: .25, backgroundColor:"#F6EFD9", ease:"none", paused:true, reversed:true});
    t2 = gsap.to(".headerbuttons", {duration: .1, color:"black", ease:"none", paused:true, reversed:true});
    t3 = gsap.to(".logocircle", {duration: .25, backgroundColor:"black", ease:"none", paused:true, reversed:true});  

  })
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY
      setScrollPosition(position);
      if (position < 100) {
        t.reverse()
        t2.reverse()
        t3.reverse()
      } else {
        t.play()
        t2.play()
        t3.play()
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {window.removeEventListener('scroll', handleScroll)};
  }, [])

  return (
    <>
    <header className="primary">
        <div className="navcontainer" ref={navcontainer}>
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
                        {user ? (
                        <>
                        <Link to={"/profile"} className="nav-link headerbuttons"><i className="fa-solid fa-user"></i> {user.username}</Link>
                        <Link to={"/login"} style={{color: "rgb(246, 239, 217)"}} className="nav-link headerbuttons" onClick={signout}> Log out</Link>
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
    </>
  )
}
