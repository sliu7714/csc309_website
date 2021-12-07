import React from "react";
import "./styles.css"
import Tag from "../SearchTag/Tag";
import CommentSection from "./CommentSection";
import ApplicantsSection from "./ApplicantsSection";
import Popup from "../EditCreatePostPopup/Popup";
import {useState} from "react";
import ApplySection from "./ApplySection";
import MemberListSection from "./MemberListSection";
import { deleteApplication, deletePost, reportPost, unreportPost } from "../../actions/postings";


// updatePostings is to call the function to rerender this post
// showUnreport is only valid if isAdmin is true
const PostingCard = ({posting, updatePostings, isAdmin, showUnreport, pending}) => {

    const isCreator = posting.isCreator
    const isMember = posting.isMember
    const isFilled = posting.isFilled


    const [showEditProfile, setShowEditProfile] = useState(false)

    const reportPosting = () =>{
        if (window.confirm(`Are you sure you want to report this post "${posting.title}"?`)){
            reportPost(posting._id)
            updatePostings()
        }
    }

    const unreportPosting = () =>{
        if (window.confirm(`Are you sure you want to un-report this post "${posting.title}"?`)){
            unreportPost(posting._id)
            updatePostings()
        }
    }

    const deletePosting = () =>{
        if (window.confirm("Please confirm if you want to delete this post. This action cannot be undone.")){
            deletePost(posting._id)
            updatePostings()
        }
    }

    const revokeApplication = () =>{
        if (window.confirm("Please confirm if you want to revoke application to this post.")){
            deleteApplication(posting._id)
            updatePostings()
        }
    }

    // convert date string to more readable format
    const parseDateStr = (dateStr) =>{
        return new Date(dateStr).toDateString()
    }

    if (isFilled) {
        return(null)
    }

    return (

        <div className="posting posting-card">
            <a  className="title-link" href={`/posting/${posting._id}`} target="_blank">
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
                posting.isReported ?
                    <button className="report-button top-right-btn red" onClick={() => alert("this post has already been reported by someone")}>Reported</button>
                    :
                    <button className="report-button top-right-btn" onClick={() => reportPosting()}>Report </button>
            }

            {
                isAdmin && showUnreport ?
                    <button className="report-button top-right-btn2" onClick={() => unreportPosting()}>Un-Report</button>
                    :
                    null
            }


            <hr />
            <h4 className="posting-text posting-creator"> Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.description}</p>
            </div>

            <div className="posting-text"> End Date: <i>{posting.endDate ? parseDateStr(posting.endDate) : 'n/a'} </i></div>


            <MemberListSection showMemberSection={isCreator || isMember || isCreator} posting={posting}/>




            {
                isCreator ?
                    <ApplicantsSection posting={posting} updatePostings={updatePostings}/>
                    :
                !isMember ?
                    <ApplySection posting={posting} updatePostings={updatePostings}/>
                    :
                    null
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

            {
                pending ?
                    <div className="close_icon">
                        <img id="close_icon"
                            src="/images/close_icon.svg"
                            alt="close icon"
                            onClick={() => revokeApplication()}
                        />
                    </div>
                    :
                    null
            }


        </div>
    )

}

export default PostingCard;