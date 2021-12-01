import "./styles.css"

const Comment = ({comment}) =>{


    return(
        <div >
            <hr className="hr-dotted"/>
            <div className="comment">
                <p className="green-text">{comment.creator.name}</p>
                {comment.content}
            </div>
        </div>
    )
}

export default Comment