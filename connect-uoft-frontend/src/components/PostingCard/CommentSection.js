import DropdownArrow from "../DropdownArrow/DropdownArrow";
import Comment from "./Comment";
import {useState, useEffect} from "react";
import { commentPost } from "../../actions/postings";


const CommentSection = ({posting, updatePostings}) => {

    const [showComments, setShowComments] = useState(false)
    const [newCommentText, setNewCommentText] = useState("")

    const createComment = () => {
        // TODO: backend connect
        console.log('comment', newCommentText)
        // now need to call function in parent to update postings data for frontend to reflect changes
        commentPost(newCommentText, posting._id)
        updatePostings()
    }


    return(
        <div className="comment-section" >
            <span className="posting-text light-bold" >Comments</span>
            <DropdownArrow show={showComments} setShow={setShowComments}/>
            {
                posting.commentsInfo  && showComments ?
                    posting.commentsInfo.length < 1 ?
                        <div className="grey-text posting-text">
                            no comments
                        </div>
                        :
                        posting.commentsInfo.map(comment => <Comment key={comment.id} comment={comment}/>)
                        :
                        null
            }
            {
                showComments ?
                    <div className="comment-input-section">
                        <hr className="hr-dotted"/>
                        <input className="comment-box"
                               type="text"
                               value={newCommentText}
                               placeholder={"Add comment..."}
                               onChange={(e) => setNewCommentText(e.target.value)}
                        />
                        <button className="comment-button" onClick={createComment}>Post</button>
                    </div>
                    : null
            }

        </div>
    )
}

export default CommentSection