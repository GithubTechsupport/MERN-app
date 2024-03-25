import React from 'react'

export default function Quiz() {
  const isDisabled = {0: q.answers[0], 1: q.answers[1], 2: q.answers[2], 3: q.answers[3]}
  const isRight = {0: q.right_answers[0], 1: q.right_answers[1], 2: q.right_answers[2], 3: q.right_answers[3]}

  return (
    <>
    <div className='w-[960px] min-h-[230px] rounded-[15px] bg-[#e1c79b] mb-[46.95px]' key={i}>
      <div className='flex'>
      <div className="laptop:text-[20px] laptop:ml-[30px]">#{i + 1}</div>
      <button type="button" className="ml-auto order-2 cursor-pointer laptop:text-[20px] laptop:mr-[7.5px]" onClick={() => {handleDeleteQuestion(i)}}>x</button>
      </div>
      <Input type="text" name="question" value={q.question} placeholder="QUESTION" className="rounded-[10px] outline-none m-[30px] mt-[0px] w-[900px] text-center bg-[#F6EFD9] h-[42.5px]" onChange={(e) => {handleUpdateQuestion(e)}} required/>
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
