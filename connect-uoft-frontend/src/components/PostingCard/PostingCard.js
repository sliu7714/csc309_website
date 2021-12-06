import React from "react";
import "./styles.css"
import Tag from "../SearchTag/Tag";
import CommentSection from "./CommentSection";
import ApplicantSection from "./ApplicantsSection";
import Popup from "../EditCreatePostPopup/Popup";
import {useState} from "react";
import ApplicantsSection from "./ApplicantsSection";
import ApplySection from "./ApplySection";


// updatePostings is to call the function to rerender this post
// isCreator is a boolean that is true only if this post will be shown to the creator and same for isMember
const PostingCard = ({posting, updatePostings, isCreator, isMember, isAdmin}) => {

    const [showEditProfile, setShowEditProfile] = useState(false)

    const showEditProfilePopup = () =>{
        setShowEditProfile(true)
    }

    const reportPosting = () =>{
        // TODO connect to backend
        console.log('report posting', posting._id)
        // now need to call function in parent to update postings data for frontend to reflect changes
        updatePostings()
    }

    const deletePosting = () =>{
        // TODO connect to backend
        console.log('delete posting', posting._id)
        // now need to call function in parent to update postings data for frontend to reflect changes
        updatePostings()
    }

    // convert date string to more readable format
    const parseDateStr = (dateStr) =>{
        return new Date(dateStr).toDateString()
    }

    return (
        <div className="posting posting-card">
            <a  id="title-link" href={`/posting/${posting._id}`} target="_blank">
                <h2 className="posting-text posting-card-title" >{posting.title}</h2>
            </a>

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
                               posting={posting}
                               updatePostings={updatePostings}/>
                    </div>
                    :
                isAdmin ?
                    <button className="delete-button top-right-btn" onClick={() => deletePosting()}> Delete</button>
                    :
                    <button className="report-button top-right-btn" onClick={() => reportPosting()}>Report </button>
            }


            <hr />
            <h4 className="posting-text posting-creator"> Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.description}</p>
            </div>

            <div className="posting-text"> End Date: <i>{posting.endDate ? parseDateStr(posting.endDate) : 'n/a'} </i></div>


            <hr />
            <p className="posting-text "> Spaces Filled: {posting.members.length + 1} / {posting.capacity}</p>
            <hr />



            {
                isCreator ?
                    <ApplicantSection posting={posting} updatePostings={updatePostings}/>
                    :
                    <ApplySection posting={posting} updatePostings={updatePostings}/>
            }

            {
                isCreator || isMember || isAdmin ?
                    <div>
                        <hr/>
                        <CommentSection posting={posting} updatePostings={updatePostings}/>
                    </div>
                    :
                    null
            }


        </div>
    )

}

export default PostingCard;