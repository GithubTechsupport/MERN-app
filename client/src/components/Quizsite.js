import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import "./styling/quizsite.css";
import $ from 'jquery';
import { useGetQuiz } from './hooks/useGetQuiz';
import { useAuthContext } from './hooks/useAuthContext';

export default function Quizsite() {
    const { getquiz, isLoading, error } = useGetQuiz();
    const { user } = useAuthContext()
    useEffect(() => {
    const update = async () => {
        await getquiz()
      }
    update()
    }, [])

    const cardQuestionOnHover = () => {
        //console.log("hovering")
        $('.card-question').animate({scrollLeft: 156}, 800); 
    }
    
    const cardQuestionOffHover = () => {
        //console.log("off hovering")
    }

    $('.card-question').on( "mouseenter", cardQuestionOnHover ).on( "mouseleave", cardQuestionOffHover );
  return (
    <>
    {!isLoading ? (<>
                <section className='bg-[#fdbe3f] w-screen h-[50vh] flex justify-center'>
                <h1 className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[70px]'>YOUR QUIZ</h1>
            </section>  
            <section className='bg-black w-screen h-[100vh] mt-[-20vh] flex flex-wrap justify-center p-[10px]'>
                <div className='question-card'>
                    <div className='card-title'>QUIZ ABOUT THE CAPITALS OF ALL THE COUNTRIES IN THE WORLD</div>
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
                {user ?
                  user.quizes.map((quiz, index) => (
                    <div key={index} className='question-card'>
                        <div className='flex justify-between'>
                            <div className='card-title' key={index}>{quiz.title}</div>
                            <Link to={{pathname: "/editQuiz", search: `?quizID=${quiz._id}`}} className='cursor-pointer'>Edit</Link>
                        </div>
                        <div className='card-mid'>
                            <div className='card-content'>
                                {quiz.questions.map((question, index2) => (
                                    <div className='card-question' key={index2}>Q{index2 + 1}: {question.question}</div>
                                ))}
                            </div>
                        </div>
                        <div className='card-footer'>
                            <div className='card-q-count'>{quiz.questions.length} Question(s)</div>
                            <Link to={{pathname: "/lobby", search: `?quizID=${quiz._id}`}} className='card-play-button'>Play</Link>
                        </div>
                    </div>
                  )) : (
                    <>
                    <div className='text-white'>Sign in to view your Quizes</div>
                    </>
                  )}
            </section>
        </>    
    ) : (<div>loading</div>)}
    </>
  )
}
