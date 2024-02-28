import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "./styling/createquiz.css";

import UserService from "../services/user.service";

export default function CreateQuiz() {
  const form = useRef(); 
  const [title, setTitle] = useState("");
  const [quiz, setQuiz] = useState([{question: "", answers: ["","","",""], right_answers: [false, false, false, false]}]);
  const answersRef = useRef(quiz.map(e => {return [...e.answers]}));

  const handleAddQuestion = () => {
    setQuiz([...quiz, {question: "", answers: ["","","",""], right_answers: [false, false, false, false]}]);
    answersRef.current = [...answersRef.current, ["","","",""]]
  }

  const handleDeleteQuestion = (i) => {
    if (quiz.length == 1) {
      return
    }
    setQuiz(quiz.filter((q, j) => i !== j));
    answersRef.current = answersRef.current.filter((a, k) => i !== k);
  }

  const handleDisableAnswer = (e, i, answernr) => {
    var inputElement = e.target.previousElementSibling.children[0];
    if (inputElement.right === "true") {return}
    inputElement.disabled = !inputElement.disabled;
    if (inputElement.disabled) {
      answersRef.current = answersRef.current.map((a, j) => {
        if (j === i) {a[answernr] = inputElement.value}
        return a
      })
      inputElement.value = null;
      inputElement.classList.add('cursor-not-allowed', 'brightness-50');
      inputElement.placeholder="DISABLED"} 
    else {
      inputElement.value = answersRef.current[i][answernr];
      inputElement.classList.remove('cursor-not-allowed', 'brightness-50');
      inputElement.placeholder=`ANSWER ${answernr + 1}`};
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
    !quiz[i].right_answers[answernr] ? inputElement.classList.add('grayscale') : inputElement.classList.remove('grayscale')
    inputElement.right === "true" ? inputElement.right = "false" : inputElement.right = "true";
    setQuiz(quiz.map((q, j) => (i === j ? {...q, right_answers: q.right_answers.map((a, k) => (answernr === k ? !a : a))} : q)))
  }

  const handleQuizSubmission = async (e) => {
    e.preventDefault()
    await UserService.createQuiz(title, quiz)
  }

  return (
    <>
      <section className='bg-[#FFAE1D] w-screen desktop:h-[40vh] laptop:h-[42.5vh] flex justify-center'>
        <h1 className='text-[#F6EFD9] mt-[4%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[65px]'>CREATE YOUR QUIZ</h1>
      </section>  
      <section className='bg-[#170703] w-screen min-h-[100%] mt-[-20vh] flex justify-center font-["readex_pro"]'>
        <Form onSubmit={handleQuizSubmission} ref={form}>
          <Input className='mb-[5vh] mt-[5vh] ml-[calc(50%-25vw)] w-[50vw] h-[50px] bg-[#F6EFD9] outline-none rounded-2xl text-center text-[30px] text-[#250e11]' placeholder="TITLE" type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} required/>
          {quiz.map((q, i) =>
            <>
            <div className='w-[960px] min-h-[230px] rounded-[15px] bg-[#e1c79b] mb-[46.95px]' key={i}>
              <button type="button" className="float-right cursor-pointer laptop:text-[30px] laptop:mr-[7.5px]" onClick={() => {handleDeleteQuestion(i)}}>x</button>
              <Input type="text" name="question" value={q.question} placeholder="QUESTION" className="rounded-[10px] outline-none m-[30px] mt-[0px] w-[900px] text-center bg-[#F6EFD9] h-[42.5px]" onChange={(e) => {
                var quizCopy = [...quiz]
                quizCopy[i].question = e.target.value
                setQuiz(quizCopy)
              }} required/>
              <table className="mx-[30px] w-[900px] mb-[30px]">
                <tr>
                  <td className="position-relative">
                    <Input placeholder="ANSWER 1" right={"false"} className="filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer1" storedvalue={null} value={q.answers[0]} onChange={e => handleUpdateAnswer(e.target, i, 0)}/>
                    <button type="button" className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/4 aspect-square" onClick={e => handleDisableAnswer(e, i, 0)}>x</button>
                    <button type="button" className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square" onClick={e => handleSetRight(e, i, 0)}>✓</button>
                  </td>
                  <td className="position-relative">
                    <Input placeholder="ANSWER 2" right={"false"} className="filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer2" storedvalue={null} value={q.answers[1]} onChange={e => handleUpdateAnswer(e.target, i, 1)}/>
                    <button type="button" className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/4 aspect-square" onClick={e => handleDisableAnswer(e, i, 1)}>x</button>
                    <button type="button" className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square" onClick={e => handleSetRight(e, i, 1)}>✓</button>
                  </td>
                </tr>
                <tr>
                  <td className="position-relative">
                    <Input placeholder="ANSWER 3" right={"false"} className="filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer3" storedvalue={null} value={q.answers[2]} onChange={e => handleUpdateAnswer(e.target, i, 2)}/>
                    <button type="button" className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/4 aspect-square" onClick={e => handleDisableAnswer(e, i, 2)}>x</button>
                    <button type="button" className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square" onClick={e => handleSetRight(e, i, 2)}>✓</button>
                  </td>
                  <td className="position-relative">
                    <Input placeholder="ANSWER 4" right={"false"} className="filter pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer4" storedvalue={null} value={q.answers[3]} onChange={e => handleUpdateAnswer(e.target, i, 3)}/>
                    <button type="button" className="absolute top-0 right-0 transform -translate-x-1/2 -translate-y-1/4 aspect-square" onClick={e => handleDisableAnswer(e, i, 3)}>x</button>
                    <button type="button" className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2 aspect-square" onClick={e => handleSetRight(e, i, 3)}>✓</button>
                  </td>
                </tr>
              </table>
            </div>
            </>
            )}  
          <button type="button" onClick={handleAddQuestion} className='w-[960px] min-h-[100px] rounded-[15px] mb-[46.95px] flex text-center items-center justify-center border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]'>
            <h1 className="text-[100px]">+</h1>
          </button>
          <button className="text-white">Add Quiz</button>
        </Form>
      </section>
    </>
  )
}
