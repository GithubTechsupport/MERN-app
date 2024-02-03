import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import "./styling/createquiz.css";

import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

export default function CreateQuiz() {
  const form = useRef();
  
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [rightanswer, setRightanswer] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");

  const onChangeTitle = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const onChangeQuestion = (e) => {
    const question = e.target.value;
    setQuestion(question);
  };

  const onChangeAnswer1 = (e) => {
    const answer1 = e.target.value;
    setAnswer1(answer1);
  };

  const onChangeAnswer2 = (e) => {
      const answer2 = e.target.value;
      setAnswer2(answer2);
  };

  const onChangeAnswer3 = (e) => {
      const answer3 = e.target.value;
      setAnswer3(answer3);
  };
  
  const onChangeAnswer4 = (e) => {
      const answer4 = e.target.value;
      setAnswer4(answer4);
  };

  const handleQuizSubmission = (e) => {
    e.preventDefault()
    UserService.createQuiz(title, [{question: question, right_answers: [rightanswer], answers: [answer1, answer2, answer3, answer4] }])
  }

  return (
    <>
      <section className='bg-[#FFAE1D] w-screen h-[40vh] flex justify-center'>
        <h1 className='text-[#F6EFD9] mt-[4%] font-["Tungsten-Bold"] lg:text-[80px]'>CREATE YOUR QUIZ</h1>
      </section>  
      <section className='bg-[#170703] w-screen h-[100vh] mt-[-20vh] flex justify-center font-["readex_pro"]'>
        <Form onSubmit={handleQuizSubmission} ref={form}>
          <Input className='mb-[5vh] mt-[5vh] w-[50vw] h-[50px] bg-[#F6EFD9] outline-none rounded-2xl text-center text-[30px] text-[#250e11]' placeholder="TITLE" type="text" name="title" value={title} onChange={onChangeTitle} required/>
          <div className='w-[960px] min-h-[230px] rounded-[15px] bg-[#e1c79b] mb-[46.95px]'>
            <Input type="text" name="title" value={question} placeholder="QUESTION" className="rounded-[10px] outline-none m-[30px] w-[900px] text-center bg-[#F6EFD9] h-[42.5px]" onChange={onChangeQuestion} required/>
            <table className="mx-[30px] w-[900px] mb-[30px]">
              <tr>
                <td><Input placeholder="ANSWER 1" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer1" value={answer1} onChange={onChangeAnswer1}/></td>
                <td><Input placeholder="ANSWER 2" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer2" value={answer2} onChange={onChangeAnswer2}/></td>
              </tr>
              <tr>
                <td><Input placeholder="ANSWER 3" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer3" value={answer3} onChange={onChangeAnswer3}/></td>
                <td><Input placeholder="ANSWER 4" className="pl-[10px] rounded-[10px] outline-none w-[100%] bg-[#F6EFD9] h-[42.5px]" type="text" name="answer4" value={answer4} onChange={onChangeAnswer4}/></td>
              </tr>
            </table>
          </div>  
          <div className='w-[960px] min-h-[100px] rounded-[15px] mb-[46.95px] flex text-center items-center justify-center border-solid border-2 border-[#e1c79b] cursor-pointer text-[#e1c79b] ease-in duration-100 hover:bg-[#e1c79b] hover:text-[#170703]'>
            <h1 className="text-[100px]">+</h1>
          </div>
          <button className="text-white">Add Quiz</button>
        </Form>
      </section>
    </>
  )
}
