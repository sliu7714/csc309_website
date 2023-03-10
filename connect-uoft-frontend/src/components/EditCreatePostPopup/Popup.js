import {useState, useEffect} from 'react';
import './Popup.css'
import TagRemovable from "../SearchTag/TagRemovable";
import {addPosting, updatePost, deletePost} from "../../actions/postings";



const Popup = ({trigger, setTrigger, isEditing, posting, updatePostings }) => {

    // used for creating a new post: (if isEditing is false)
    const initialPosting = {
        title: "",
        description: "",
        endDate: "",
        capacity: 2,
        tags: [],
    }

    const [postingInfo, setPostingInfo] = useState(initialPosting)

    useEffect(() =>{
        if (isEditing){
            // making a copy of the post so the background post is not changing as we edit this
            // this is only relevant when using this popup to edit a post
            const postingCopy = Object.assign({}, posting)
            setPostingInfo(postingCopy)
        }
    }, [posting, isEditing])

    // the current text in the tag input box
    const [inputTagText, setInputTagText] = useState("")

    const addTag = () => {
        if(!postingInfo.tags){
            postingInfo.tags = []
        }
        if (postingInfo.tags.includes(inputTagText)){
            console.log(postingInfo.tags)
            console.log(`already added tag: ${inputTagText}`)
        }else{
            setPostingInfo({...postingInfo, tags: [...postingInfo.tags, inputTagText]})
            setInputTagText("")
        }
    }

    const removeTag = (tagText) => {
        const filteredTags = postingInfo.tags.filter(tag => tag !== tagText)
        setPostingInfo({...postingInfo, tags: filteredTags})
    }

    const addCapacity = (event) =>{
        const capacity = event.target.value
        if ( capacity <= 1){
            alert("please input a capacity greater than 1")
            return;
        }
        if( postingInfo.members && postingInfo.members.length && capacity <= postingInfo.members.length){
            alert("please input a capacity greater than the current number of members")
            return;
        }
        setPostingInfo({...postingInfo, capacity })
    }

    const addEndDate = (event) =>{
        const endDate = event.target.value

        if (!isEditing){
            // NOTE: Date uses month *index* NOT month so January=0, February=1, etc...
            const endDateObj = new Date(endDate.slice(0,4), parseInt(endDate.slice(5,7)) -1, endDate.slice(8,10))
            const now = new Date()
            now.setHours(0,0,0,0)

            // new post should not have endDate later than current date
            if (endDateObj < now){

                alert("please input an endDate later than today")
                return;
            }
        }

        setPostingInfo({...postingInfo, endDate })
    }

    const closePopup = () => {
        if (!isEditing){
            // clear state for next create post
            setPostingInfo(initialPosting)
        }

        setTrigger(false)
    }

    const deletePosting = () =>{
        // add confirm window to check for deletion
        if (window.confirm("Please confirm if you want to delete this post. This action cannot be undone.")){
            deletePost(posting._id)
            updatePostings()
            closePopup()
        }

    }

    const createPost = () =>{
        if(!postingInfo.title || !postingInfo.endDate){
            alert("please make sure your post contains a title and end date")
            return;
        }

        if(isEditing){
            updatePost(postingInfo, posting._id)

        }
        else{
            addPosting(postingInfo)
        }
        updatePostings() // function to re-fetch posts in page if needed
        closePopup()
    }

    return (trigger) ? (
        <div className="createSection">
            <div className="innerCreate">
                {
                    isEditing ?
                        <h2 className="createHeader"> Edit Posting </h2>
                        :
                        <h2 className="createHeader"> Create Posting </h2>
                }

                <div className="tagForm" >
                    <ul className="tagList">
                        <input className="smallInput"
                               type="text"
                               name="tag"
                               value={inputTagText}
                               onChange={(e) => setInputTagText(e.target.value)}
                               placeholder="Add Tag..."  />
                        <button className="smallInput" value="Add" onClick={() => addTag()} >Add</button>
                        {postingInfo.tags ? postingInfo.tags.map(tagText => <TagRemovable key={tagText} className="create_post_tag" text={tagText} removeTag={removeTag}/>) : null}
                    </ul>
                </div>

                <ul className="inputList">
                    <li>
                        <label>
                            <div className="input-label">Title</div>
                        <input className="standardInput"
                               type="text"
                               name="postingTitle"
                               value={postingInfo.title}
                               onChange={(e) => setPostingInfo({...postingInfo, title: e.target.value})}
                               placeholder="Add Title..." />
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="input-label">End date</div>
                            <input className="standardInput"
                                   name="endDate"
                                   type="date"
                                   value={postingInfo.endDate}
                                   onChange={(e) => addEndDate(e)}
                            />
                        </label>
                    </li>
                    <li>
                        <label>
                            <div className="input-label">Description</div>
                        <textarea
                            className="descriptionInput"
                            type="text"
                            name="postingDescription"
                            value={postingInfo.description}
                            onChange={(e) => setPostingInfo({...postingInfo, description: e.target.value})}
                            placeholder="Add Description..."/>
                        </label>
                    </li>
                    <li>
                        <label>
                        <div className="input-label">Capacity</div>
                        <input className="standardInput"
                            name="numberOfGuests"
                            type="number"
                            value={postingInfo.capacity}
                            onChange={(e) => addCapacity(e)}
                            placeholder="Group Capacity"
                            />
                        </label>
                    </li>

                    <button className="submit-button" onClick={() => createPost()}>Submit</button>
                </ul>

                { isEditing ?
                    <button className="delete-button" onClick={() => deletePosting()}>Delete Post</button>
                    : null
                }

                <button className="closeButton" onClick={() => closePopup()}>Cancel</button>
            </div>
        </div>
    ) : null;
}


export default Popup