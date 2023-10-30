import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

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
      <section className='bg-[#fdbe3f] w-screen h-[50vh] flex justify-center'>
        <h1 className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] lg:text-[80px]'>CREATE YOUR QUIZ</h1>
      </section>  
      <section className='bg-black w-screen h-[100vh] mt-[-20vh]'>
        <Form onSubmit={handleQuizSubmission} ref={form}>
        <label className='text-white'>Title: </label>
          <Input type="text" name="title" value={title} onChange={onChangeTitle} required/>
          <label className='text-white'>Question: </label>
          <Input type="text" name="title" value={question} onChange={onChangeQuestion} required/>
          <label className='text-white'>Answers: </label>
          <Input type="text" name="answer1" value={answer1} onChange={onChangeAnswer1}/>
          <Input type="text" name="answer2" value={answer2} onChange={onChangeAnswer2}/>
          <Input type="text" name="answer3" value={answer3} onChange={onChangeAnswer3}/>
          <Input type="text" name="answer4" value={answer4} onChange={onChangeAnswer4}/>
          <select value={rightanswer} onChange={(e) => setRightanswer(e.target.value)}>
            <option value={answer1}>{answer1}</option>
            <option value={answer2}>{answer2}</option>
            <option value={answer3}>{answer3}</option>
            <option value={answer4}>{answer4}</option>
          </select>
          <button className="text-white">Add Quiz</button>
        </Form>
      </section>
    </>
  )
}
