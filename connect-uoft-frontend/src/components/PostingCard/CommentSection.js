import DropdownArrow from "../DropdownArrow/DropdownArrow";
import Comment from "./Comment";
import {useState} from "react";


const CommentSection = ({posting, userID, updatePostings}) => {

    const [showComments, setShowComments] = useState(false)
    const [newCommentText, setNewCommentText] = useState("")

    const createComment = () => {
        // TODO: backend:
        console.log('comment', userID, newCommentText)
        // now need to call function in parent to update postings data for frontend to reflect changes
        // updatePostings()
    }


    return(
        <div >
            <b className="posting-text" >Comments</b>
            <DropdownArrow show={showComments} setShow={setShowComments}/>
            {
                posting.comments  && showComments ?
                    posting.comments.map(comment => <Comment key={comment.id} comment={comment}/>)
                    : null
            }
            {/*TODO : add a section to add new comment  */}
        </div>
    )
}

export default CommentSection