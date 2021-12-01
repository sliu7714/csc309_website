import React from "react";
import "./styles.css"
import Tag from "../SearchTag/Tag";
import CommentSection from "./CommentSection";
import ApplicantSection from "./ApplicantsSection";
import Popup from "../Popup/Popup";
import {useState} from "react";
import ApplicantsSection from "./ApplicantsSection";
import ApplySection from "./ApplySection";


// updatePostings is to call the function to rerender this post
// isCreator is a boolean that is true only if this post will be shown to the creator and same for isMember
// userID is the user id of the currently logged in user
const PostingCard = ({posting, updatePostings, isCreator, isMember, userID}) => {

    const [showEditProfile, setShowEditProfile] = useState(false)

    const showEditProfilePopup = () =>{
        setShowEditProfile(true)
    }

    const reportPosting = () =>{
        // TODO connect to backend
        console.log('report posting', posting.id)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }

    return (
        <div className="posting posting-card">
            <h2 className="posting-text posting-card-title">{posting.title}</h2>
            <div className="tag-section">
                {
                    posting.tags ?
                        posting.tags.map(tag => <Tag key={tag} text={tag} />)
                        : null
                }
            </div>

            {
                isCreator ?
                    <div>
                        <button className="edit-button top-right-btn" onClick={() => setShowEditProfile(true)}> Edit</button>
                        <Popup trigger={showEditProfile}
                               setTrigger={setShowEditProfile}
                               isEditing={true}
                               posting={posting}/>
                    </div>
                    :
                    <button className="report-button top-right-btn" onClick={() => reportPosting()}>Report </button>
            }


            <hr />
            <h4 className="posting-text posting-creator"> Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.description}</p>
            </div>

            <div className="posting-text"> End Date: {posting.endDate}</div>


            <hr />
            <p className="posting-text "> Spaces Filled: {posting.members.length + 1} / {posting.capacity}</p>
            <hr />



            {
                isCreator ?
                    <ApplicantSection posting={posting} userID={userID} updatePostings={updatePostings}/>
                    :
                    <ApplySection posting={posting} userID={userID} updatePostings={updatePostings}/>
            }

            {
                isCreator || isMember ?
                    <CommentSection posting={posting} userID={userID} updatePostings={updatePostings}/>
                    :
                    null
            }


        </div>
    )

}

export default PostingCard;