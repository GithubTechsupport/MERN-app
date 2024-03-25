import React, { useState, useRef, useEffect } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";

import UserService from "../services/user.service";
import { useAuthContext } from "./hooks/useAuthContext";

export default function EditQuiz() {
  const [triggerRender, setTriggerRender] = useState(true)
  const form = useRef();
  const quizID = useState(new URLSearchParams(window.location.search).get('quizID'))[0];
  const { user } = useAuthContext()
  const userQuiz = user.quizes.filter((element) => {return element._id == quizID})[0];
  const [title, setTitle] = useState(userQuiz.title);
  const [quiz, setQuiz] = useState(userQuiz.questions);
  const answersRef = useRef(quiz.map(e => {return [...e.answers]}));
  const positions = useRef([])
  const remaining = useRef([])
  const navigate = useNavigate();

  const handleUpdateQuestion = (e, i) => {
    var quizCopy = [...quiz]
    quizCopy[i].question = e.target.value
    setQuiz(quizCopy)
  }

  const handleAddQuestion = () => {
    setQuiz([...quiz, {question: "", answers: ["","","",""], right_answers: [false, false, false, false]}]);
    answersRef.current = [...answersRef.current, ["","","",""]]
  }

  const handleDeleteQuestion = (i) => {
    if (quiz.length == 1) {
      return
    }
    remaining.current = positions.current.map((q, l) => (l == i+1 ? 323.9 : null))
    setQuiz(quiz.filter((q, j) => i !== j));
    answersRef.current = answersRef.current.filter((a, k) => i !== k);
  }

  useEffect(() => {
    setTriggerRender(!triggerRender)
  }, [quiz])

  const handleDisableAnswer = (e, i, answernr) => {
    var inputElement = e.target.previousElementSibling.children[0];
    if (inputElement.attributes.correct.value === "true") {return}
    inputElement.disabled = !inputElement.disabled;
    if (inputElement.disabled) {
      answersRef.current = answersRef.current.map((a, j) => {
        if (j === i) {a[answernr] = inputElement.value}
        return a
      })
    } 
    else {
      inputElement.value = answersRef.current[i][answernr];
    }
    handleUpdateAnswer(inputElement, i, answernr)
  }

  const handleUpdateAnswer = (inputElement, i, answernr) => {
    var quizCopy = [...quiz];
    inputElement.disabled === true ? quizCopy[i].answers[answernr] = null : quizCopy[i].answers[answernr] = inputElement.value
    setQuiz(quizCopy);
  }

  const handleSetRight = (e, i, answernr) => {
    var inputElement = e.target.previousElementSibling.previousElementSibling.children[0]
    if (inputElement.disabled) {return}
    inputElement.correct === "true" ? inputElement.correct = "false" : inputElement.correct = "true";
    setQuiz(quiz.map((q, j) => (i === j ? {...q, right_answers: q.right_answers.map((a, k) => (answernr === k ? !a : a))} : q)))
  }

  const handleQuizSubmission = async (e) => {
    e.preventDefault();
    try {
      await UserService.updateQuiz(quizID, title, quiz)
      navigate("/quiz")
    } catch (err) {
      console.log(err) 
    }
  }

  const deleteQuiz = async () => {
    try {
      await UserService.deleteQuiz(quizID);
      navigate("/quiz");   
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <section className='bg-[#FFAE1D] w-screen desktop:h-[40vh] laptop:h-[42.5vh] flex justify-center'>
        <h1 className='text-[#F6EFD9] mt-[4%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[65px]'>EDIT YOUR QUIZ</h1>
      </section>  
      <section className='bg-[#170703] w-screen min-h-[100%] mt-[-20vh] flex justify-center font-["readex_pro"]'>
        <Form onSubmit={handleQuizSubmission} ref={form}>
          <Input className='mb-[5vh] mt-[5vh] w-[100%] h-[50px] bg-[#F6EFD9] outline-none rounded-2xl text-center text-[30px] text-[#250e11]' placeholder="TITLE" type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} required/>
          {quiz.map((q, i) => {
            var isDisabled = {0: q.answers[0], 1: q.answers[1], 2: q.answers[2], 3: q.answers[3]}
            var isRight = {0: q.right_answers[0], 1: q.right_answers[1], 2: q.right_answers[2], 3: q.right_answers[3]}
            console.log(positions.current[0] ? positions.current[0].offsetTop : null)
            return (
              <>
              <div ref={ref => positions.current[i] = ref} className={`w-[100%] min-h-[200px] rounded-[15px] mb-[46.95px] bg-[#e1c79b] ${remaining.current[i + 1] ? `mt-[${remaining.current[i + 1]}px] animate-[slide_0.5s_ease-out_forwards]` : ""}`} key={i}>
                <div className='flex'>
                <div className="absolute translate-x-1/2 laptop:text-[20px] right-1/2">QUESTION {i + 1}</div>
                <button type="button" className="ml-auto order-2 cursor-pointer laptop:text-[20px] laptop:mr-[5px]" onClick={() => {handleDeleteQuestion(i)}}><i class="fa-solid fa-xmark"></i></button>
                </div>
                <Input type="text" name="question" value={q.question} placeholder="QUESTION" className="rounded-[10px] outline-none m-[30px] mt-[0px] w-[900px] text-center bg-[#F6EFD9] h-[42.5px]" onChange={(e) => {handleUpdateQuestion(e, i)}} required/>
                <table className="mx-[30px] w-[900px] mb-[30px]">
                  <tr>
                    <td className="position-relative">
                      <Input placeholder={`${isDisabled[0] === null ? "DISABLED" : "ANSWER 1"}`} disabled={isDisabled[0] === null} correct={String(isRight[0])} className={`filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px] ${isDisabled[0] === null ? "cursor-not-allowed brightness-50" : ""} ${isRight[0] ? "grayscale" : ""}`} type="text" name="answer1" value={isDisabled[0] ?? ""} onChange={e => handleUpdateAnswer(e.target, i, 0)}/>  
                      <button type="button" className="absolute top-1/2 right-[4px] transform -translate-x-[0] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleDisableAnswer(e, i, 0)}>x</button>                    
                      <button type="button" className="absolute top-1/2 right-[7px] transform -translate-x-[100%] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleSetRight(e, i, 0)}>✓</button>
                    </td>
                    <td className="position-relative">
                      <Input placeholder={`${isDisabled[1] === null ? "DISABLED" : "ANSWER 2"}`} disabled={isDisabled[1] === null} correct={String(isRight[1])} className={`filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px] ${isDisabled[1] === null ? "cursor-not-allowed brightness-50" : ""} ${isRight[1] ? "grayscale" : ""}`} type="text" name="answer1" value={isDisabled[1] ?? ""} onChange={e => handleUpdateAnswer(e.target, i, 1)}/>  
                      <button type="button" className="absolute top-1/2 right-[4px] transform -translate-x-[0] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleDisableAnswer(e, i, 1)}>x</button>
                      <button type="button" className="absolute top-1/2 right-[7px] transform -translate-x-[100%] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleSetRight(e, i, 1)}>✓</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="position-relative">
                      <Input placeholder={`${isDisabled[2] === null ? "DISABLED" : "ANSWER 3"}`} disabled={isDisabled[2] === null} correct={String(isRight[2])} className={`filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px] ${isDisabled[2] === null ? "cursor-not-allowed brightness-50" : ""} ${isRight[2] ? "grayscale" : ""}`} type="text" name="answer1" value={isDisabled[2] ?? ""} onChange={e => handleUpdateAnswer(e.target, i, 2)}/>
                      <button type="button" className="absolute top-1/2 right-[4px] transform -translate-x-[0] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleDisableAnswer(e, i, 2)}>x</button>
                      <button type="button" className="absolute top-1/2 right-[7px] transform -translate-x-[100%] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleSetRight(e, i, 2)}>✓</button>
                    </td>
                    <td className="position-relative">
                      <Input placeholder={`${isDisabled[3] === null ? "DISABLED" : "ANSWER 4"}`} disabled={isDisabled[3] === null} correct={String(isRight[3])} className={`filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px] ${isDisabled[3] === null ? "cursor-not-allowed brightness-50" : ""} ${isRight[3] ? "grayscale" : ""}`} type="text" name="answer1" value={isDisabled[3] ?? ""} onChange={e => handleUpdateAnswer(e.target, i, 3)}/>
                      <button type="button" className="absolute top-1/2 right-[4px] transform -translate-x-[0] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleDisableAnswer(e, i, 3)}>x</button>
                      <button type="button" className="absolute top-1/2 right-[7px] transform -translate-x-[100%] -translate-y-1/2 aspect-square h-[36.5px] rounded-[7px] bg-[transparent] border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]" onClick={e => handleSetRight(e, i, 3)}>✓</button>
                    </td>
                  </tr>
                </table>
              </div>
              </>
            )
          }
            )}
          <button type="button" onClick={handleAddQuestion} className='w-[100%] min-h-[100px] rounded-[15px] mb-[46.95px] flex text-center items-center justify-center border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]'>
            <h1 className="text-[100px]">+</h1>
          </button>
          <button className="text-white">Submit Changes</button>
          <button type="button" className="text-[red] float-right" onClick={() => {deleteQuiz()}}>Delete Quiz</button>
        </Form>
      </section>
    </>
  )
}
