import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { useNavigate } from "react-router-dom";
import "./styling/createquiz.css";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default function EditQuiz() {
  const form = useRef();
  const quizID = useState(new URLSearchParams(window.location.search).get('quizID'))[0];
  const userQuiz = AuthService.getCurrentUser().quizes.filter((element) => {return element._id == quizID})[0];
  const [title, setTitle] = useState(userQuiz.title);
  const [quiz, setQuiz] = useState(userQuiz.questions);
  const navigate = useNavigate();

  const addQuestion = () => {
    var quizCopy = quiz.slice();
    quizCopy.push({question: "", answers: ["","","",""], right_answers: ["", "", "", ""]});
    setQuiz(quizCopy);
  }

  const deleteQuestion = (i) => {
    if (quiz.length == 1) {
      return;
    }
    var quizCopy = quiz.slice();
    quizCopy.splice(i, 1);
    setQuiz(quizCopy);
  }

  const handleQuizSubmission = async (e) => {
    e.preventDefault();
    await UserService.updateQuiz(quizID, title, quiz);
    navigate("/quiz");
    window.location.reload();
  }

  const deleteQuiz = async () => {
    await UserService.deleteQuiz(quizID);
    navigate("/quiz");
    window.location.reload();
  }

  return (
    <>
      <section className='bg-[#FFAE1D] w-screen desktop:h-[40vh] laptop:h-[42.5vh] flex justify-center'>
        <h1 className='text-[#F6EFD9] mt-[4%] font-["Tungsten-Bold"] desktop:text-[80px] laptop:text-[65px]'>EDIT YOUR QUIZ</h1>
      </section>  
      <section className='bg-[#170703] w-screen min-h-[100%] mt-[-20vh] flex justify-center font-["readex_pro"]'>
        <Form onSubmit={handleQuizSubmission} ref={form}>
          <Input className='mb-[5vh] mt-[5vh] ml-[calc(50%-25vw)] w-[50vw] h-[50px] bg-[#F6EFD9] outline-none rounded-2xl text-center text-[30px] text-[#250e11]' placeholder="TITLE" type="text" name="title" value={title} onChange={(e) => {setTitle(e.target.value)}} required/>
          {quiz.map((q, i) =>
            <>
            <div className='w-[960px] min-h-[230px] rounded-[15px] bg-[#e1c79b] mb-[46.95px]' key={i}>
              <button type="button" className="float-right cursor-pointer laptop:text-[30px] laptop:mr-[7.5px]" onClick={() => {deleteQuestion(i)}}>x</button>
              <Input type="text" name="question" value={q.question} placeholder="QUESTION" className="rounded-[10px] outline-none m-[30px] mt-[0px] w-[900px] text-center bg-[#F6EFD9] h-[42.5px]" onChange={(e) => {
                var quizCopy = quiz.slice()
                quizCopy[i].question = e.target.value
                setQuiz(quizCopy)
              }} required/>
              <table className="mx-[30px] w-[900px] mb-[30px]">
                <tr>
                  <td><Input placeholder="ANSWER 1" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer1" value={q.answers[0]} onChange={e => {
                    var quizCopy = quiz.slice()
                    quizCopy[i].answers[0] = e.target.value
                    setQuiz(quizCopy)
                  }}/></td>
                  <td><Input placeholder="ANSWER 2" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer2" value={q.answers[1]} onChange={e => {
                    var quizCopy = quiz.slice()
                    quizCopy[i].answers[1] = e.target.value
                    setQuiz(quizCopy)
                  }}/></td>
                </tr>
                <tr>
                  <td><Input placeholder="ANSWER 3" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer3" value={q.answers[2]} onChange={e => {
                    var quizCopy = quiz.slice()
                    quizCopy[i].answers[2] = e.target.value
                    setQuiz(quizCopy)
                  }}/></td>
                  <td><Input placeholder="ANSWER 4" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer4" value={q.answers[3]} onChange={e => {
                    var quizCopy = quiz.slice()
                    quizCopy[i].answers[3] = e.target.value
                    setQuiz(quizCopy)
                  }}/></td>
                </tr>
              </table>
            </div>
            </>
            )}  
          <button type="button" onClick={addQuestion} className='w-[960px] min-h-[100px] rounded-[15px] mb-[46.95px] flex text-center items-center justify-center border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]'>
            <h1 className="text-[100px]">+</h1>
          </button>
          <button className="text-white">Submit Changes</button>
          <button type="button" className="text-[red] float-right" onClick={() => {deleteQuiz()}}>Delete Quiz</button>
        </Form>
      </section>
    </>
  )
}
