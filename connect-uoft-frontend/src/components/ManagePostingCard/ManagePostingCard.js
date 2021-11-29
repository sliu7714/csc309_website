import React from "react";
import "./styles.css"
import ApplicantListItem from "./ApplicantListItem";
import Tag from "../SearchTag/Tag";
import {useState} from "react";
import DropdownArrow from "../DropdownArrow/DropdownArrow";
import Comment from "./Comment";

const ManagePostingCard = ({posting, updatePostings}) => {

    const [showComments, setShowComments] = useState(false)
    const [showApplicants, setShowApplicants] = useState(false)

    const deletePosting = () =>{
        console.log("deletePosting not fully implemented")
        // fetch(`api/postings/delete/${posting.id}`)
        //     .then(res =>{
        //         if (!res.ok){
        //             // TODO: handle this - show message to user?
        //             console.log(`could not delete post, response code: ${res.status}`)
        //             return;
        //         }
        //     })
        // // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }

    const acceptApplicant =(applicantID) =>{
        // TODO connect to backend
        console.log('accept', applicantID)
    }

    const denyApplicant = (applicantID) =>{
        // TODO connect to backend
        console.log('deny', applicantID)
    }

    return (
        <div className="posting manage">
            <h2 className="posting-text">{posting.title}</h2>
            <div className="tag-section">
                {
                    posting.tags ?
                        posting.tags.map(tag => <Tag text={tag} />)
                        : null
                }
            </div>

            {/*<button className="deleteButton" onClick={deletePosting}> Delete</button>*/}
            <button className="editButton" onClick={() => {alert("pressed")}}> Edit</button>


            <hr />
            <h4 className="posting-text">Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.desc}</p>
            </div>

            <div className="posting-text"> End Date: {posting.endDate}</div>


            <hr />
            <p className="posting-text "> Spaces Filled: {posting.members.length} / {posting.capacity}</p>
            <hr />
            <div >
                <b className="posting-text" >Applicants</b>
                <DropdownArrow show={showApplicants} setShow={setShowApplicants}/>
                { posting.applicantsInfo  && showApplicants ?
                    posting.applicantsInfo.map((applicant) =>
                        <ApplicantListItem applicant={applicant}
                                           acceptApplicant={acceptApplicant}
                                           denyApplicant={denyApplicant}
                                           />)
                    : null
                }
            </div>

            <hr/>
            <div >
                <b className="posting-text" >Comments</b>
                <DropdownArrow show={showComments} setShow={setShowComments}/>
                {
                    posting.comments  && showComments ?
                        posting.comments.map(comment => <Comment comment={comment}/>)
                        : null
                }
            </div>

        </div>
    )

}

export default ManagePostingCard;