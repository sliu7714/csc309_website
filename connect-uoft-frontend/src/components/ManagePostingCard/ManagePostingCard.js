import React from "react";
import "./styles.css"
import ApplicantListItem from "./ApplicantListItem";
import Tag from "../SearchTag/Tag";
import {useState} from "react";
import DropdownArrow from "../DropdownArrow/DropdownArrow";
import Comment from "./Comment";
import Popup from "../Popup/Popup";

const ManagePostingCard = ({posting, updatePostings, setShowEditProfile, setPostingToEdit}) => {

    const [showComments, setShowComments] = useState(false)
    const [showApplicants, setShowApplicants] = useState(false)


    const acceptApplicant =(applicantID) =>{
        // TODO connect to backend
        console.log('accept', applicantID)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }

    const denyApplicant = (applicantID) =>{
        // TODO connect to backend
        console.log('deny', applicantID)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }

    const showEditProfilePopup = () =>{
        setShowEditProfile(true)
        setPostingToEdit(posting)
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
            <button className="editButton" onClick={() => showEditProfilePopup()}> Edit</button>


            <hr />
            <h4 className="posting-text posting-creator"> Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.description}</p>
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