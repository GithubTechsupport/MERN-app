import React, { useEffect } from 'react'
import "./styling/quizsite.css";
import logo from '../images/forretningslogo.png';
import $ from 'jquery';

export default function Quizsite() {
    useEffect(() => {
        const cardQuestionOnHover = () => {
            console.log("hovering")
            $('.card-question').animate({scrollLeft: 156}, 800); 
        }
    
        const cardQuestionOffHover = () => {
            console.log("off hovering")
        }

        $('.card-question').on( "mouseenter", cardQuestionOnHover ).on( "mouseleave", cardQuestionOffHover );
    }, [])

  return (
    <>
        <section className='bg-[#fdbe3f] w-screen h-[50vh] flex justify-center'>
            <h1 className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] lg:text-[80px]'>YOUR QUIZ</h1>
        </section>  
        <section className='bg-black w-screen h-[100vh] mt-[-20vh] flex justify-center p-[10px]'>
            <div className='question-card'>
                <div className='card-title'>QUIZ ABOUT THE CAPITALS OF ALL THE COUNTRIES IN THE WORLD</div>
                <div className='card-mid'>
                    <div className='card-content'>
                    <div className='card-question'><span>Q1: What is the capital of Norway?</span></div>
                    <div className='card-question'>Q2: What is the capital of Bangladesh?</div>
                    <div className='card-question'>Q3: What is the capital of USA?</div>
                    <div className='card-question'>Q4: What is the capital of London?</div>
                    <div className='card-question'>Q5: What is the capital of Iraq?</div>
                    <div className='card-question'>Q6: What is the capital of Sweden?</div>
                    <div className='card-question'>Q7: What is the capital of France?</div>
                    <div className='card-question'>Q8: What is the capital of Mexico?</div>
                    <div className='card-question'>Q9: What is the capital of Kazikhistan?</div>
                    <div className='card-question'>Q10: What is the capital of Spain?</div>
                    <div className='card-question'>Q11: What is the capital of Al Jumahiriyah al Arabiyah al Libiyah ash Shabiyah al Ishtirakiyah al Uzma?</div>
                    </div>
                </div>
                <div className='card-footer'>
                    <div className='card-q-count'>11 Questions</div>
                    <div className='card-play-button'>Play</div>
                </div>
            </div>
            <div className='question-card'>
                <div className='card-title'>CAPITALS</div>
                <div className='card-mid'>
                    <div className='card-content'>
                    <div className='card-question'>Q1: What is the capital of Norway?</div>
                    <div className='card-question'>Q2: What is the capital of Bangladesh?</div>
                    <div className='card-question'>Q3: What is the capital of USA?</div>
                    <div className='card-question'>Q4: What is the capital of London?</div>
                    <div className='card-question'>Q5: What is the capital of Iraq?</div>
                    <div className='card-question'>Q6: What is the capital of Sweden?</div>
                    <div className='card-question'>Q7: What is the capital of France?</div>
                    <div className='card-question'>Q8: What is the capital of Mexico?</div>
                    <div className='card-question'>Q9: What is the capital of Kazikhistan?</div>
                    <div className='card-question'>Q10: What is the capital of Spain?</div>
                    <div className='card-question'>Q11: What is the capital of Al Jumahiriyah al Arabiyah al Libiyah ash Shabiyah al Ishtirakiyah al Uzma?</div>
                    </div>
                </div>
                <div className='card-footer'>
                    <div className='card-q-count'>11 Questions</div>
                    <div className='card-play-button'>Play</div>
                </div>
            </div>
        </section>
    </>
  )
}
