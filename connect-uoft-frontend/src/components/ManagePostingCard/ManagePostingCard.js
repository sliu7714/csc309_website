import React from "react";
import "./ManagePostingCard.css"
import ApplicantListItem from "./ApplicantListItem";
import Tag from "../SearchTag/Tag";

const ManagePostingCard = ({posting, updatePostings}) => {

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
        console.log('accept', applicantID)
    }

    const denyApplicant = (applicantID) =>{
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



            <button className="deleteButton" onClick={deletePosting}> Delete</button>
            <hr />
            <h4 className="posting-text">Creator: {posting.creatorInfo.name}</h4>
            <div className="posting-text posting-desc">
                <p>{posting.desc}</p>
            </div>

            <div className="posting-text"> End Date: {posting.endDate}</div>


            <hr />
            <p className="posting-text "> Spaces Filled: {posting.members.length} / {posting.capacity}</p>
            <hr />
            <div className="posting-text">
                <h4>Applicants</h4>
                { posting.applicantsInfo ?
                    posting.applicantsInfo.map((applicant) =>
                        <ApplicantListItem applicant={applicant}
                                           acceptApplicant={acceptApplicant}
                                           denyApplicant={denyApplicant}/>)
                    : null
                }
            </div>

            <hr/>
            <div>
                <b>Comments</b>
                {/*TEMPORARY SECTION WILL MOVE TO PAGE*/}
                {
                    posting.comments ?
                        posting.comments.map(comment => <div> <hr className="hr-dotted"/>{comment.creator.name} <br/>{comment.content} </div>)
                        : null
                }
            </div>

        </div>
    )

}

export default ManagePostingCard;