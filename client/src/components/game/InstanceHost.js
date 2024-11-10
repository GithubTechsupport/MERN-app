import React, { useEffect } from 'react'

export default function InstanceHost(props) {
  return (
    // Create the design for the kahoot ingame screen, complete with 4 answer alternatives, 2 on each row, and a question at the top, make the color theme yellow and black, and center it vertically and horizontally.
    <div className="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="row">
        <div className="col-12">
          <h1 className="text-center">{props.data.question}</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-warning btn-lg btn-block">Answer 1</button>
        </div>
        <div className="col-6">
          <button className="btn btn-warning btn-lg btn-block">Answer 2</button>
        </div>
      </div>
      <div className="row">
        <div className="col-6">
          <button className="btn btn-warning btn-lg btn-block">Answer 3</button>
        </div>
        <div className="col-6">
          <button className="btn btn-warning btn-lg btn-block">Answer 4</button>
        </div>
      </div>
    </div>

  )
}
