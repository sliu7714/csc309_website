import React from "react";
import "./ManagePosting.css"

const Posting = (props) => (

  <div className="posting">
    <h2 className = "postingTitle">{props.block.title}</h2>
    <hr></hr>
    <h4 className = "postingCreator">Creator: {props.block.creator}</h4>
    <div className = "postingDesc">
    <p>{props.block.desc}</p>
    </div>
    <hr></hr>
    <p className = "capacity">{props.block.members.length} / {props.block.capacity}</p>
    <div className = "applicantList">
      <p>Applicants</p>
      <li>
        {props.block.applicants.map((applicants) => {return <ul>{applicants} <button>Accept</button><button>Reject</button></ul>;})}
      </li>
    </div>
  </div>
);

export default Posting;