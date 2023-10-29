import React from 'react'

export default function Faq() {
  return (
  <>
    <section className='bg-[#fdbe3f] w-screen h-[50vh] flex justify-center'>
      <h1 className='text-[#F6EFD9] mt-[6.5%] font-["Tungsten-Bold"] lg:text-[80px]'>FREQUENTLY ASKED QUESTIONS</h1>
    </section>  
    <section className='bg-black w-screen h-[100vh] mt-[-20vh]'>
      <ul>
        <h1 className='text-[white] w-screen'>Q: What is this website?</h1>
        <div className='text-[white] w-screen'>
          <p>A: The website has everything you need, and is everything you want.</p>
        </div>
      </ul>
    </section>
  </>
  )
}
