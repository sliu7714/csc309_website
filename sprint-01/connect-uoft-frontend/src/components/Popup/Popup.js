import React, {useState} from 'react';
import './Popup.css'
import TagRemovable from "../SearchTag/TagRemovable";
import {postings} from "../../data/data";


// function addTagFunction (e) {
//
//     console.log('Adding a tag')
//
//     const tagName = document.querySelector('smallInputTag')
//     const tagList = document.getElementsByClassName("tagList");
//
//     const listElement = document.createElement('li')
//     listElement.className = 'tagList'
//     listElement.appendChild(document.createTextNode(tagName))
//
//     try {
//         tagList.appendChild(listElement)
//     } catch (e) {
//         console.log('Failed to add tag')
//     }
//
// }


const Popup = ({trigger, setTrigger, userID}) => {

    const [inputTagText, setInputTagText] = useState("")
    // a list of the text in the currently displayed tags
    const [currentTags, setCurrentTags] = useState([])

    const [title, setTitle] = useState("")
    const [endDate, setEndDate] = useState("")
    const [description, setDescription] = useState("")
    const [capacity, setCapacity] = useState()

    const addTag = () => {
        if (currentTags.includes(inputTagText)){
            console.log(`already added tag: ${inputTagText}`)
        }else{
            setCurrentTags([...currentTags, inputTagText])
            setInputTagText("")
        }
    }

    const removeTag = (tagText) => {
        setCurrentTags(currentTags.filter(tag => tag !== tagText))
    }

    const createPost = () =>{
        // TODO: add post id
        const newPost = {
            id: postings.length,
            creator: userID,
            title,
            endDate,
            desc: description,
            capacity,
            tags: currentTags,
            members: [],
            applicants: [],
        }
        console.log(newPost)
        // TODO: add fetch call to store post in backend
        postings.push(newPost) //TEMPORARY
    }

    return (trigger) ? (
        <div className="createSection">
            <div className="innerCreate">

                <h3 className="createHeader"> Create Posting </h3>

                <div className="tagForm" >
                    <ul className="tagList">
                        <input className="smallInput"
                               type="text"
                               name="tag"
                               value={inputTagText}
                               onChange={(e) => setInputTagText(e.target.value)}
                               placeholder="Tags"  />
                        <button className="smallInput" value="Add" onClick={() => addTag()} >Add</button>
                        {currentTags.map(tagText => <TagRemovable className="create_post_tag" text={tagText} removeTag={removeTag}/>)}
                    </ul>
                </div>

                <ul className="inputList">
                    <li>
                        <label>
                        <input className="standardInput"
                               type="text"
                               name="postingTitle"
                               value={title}
                               onChange={(e) => setTitle(e.target.value)}
                               placeholder="Title" />
                        </label>
                    </li>
                    <li>
                        <label>
                            <input className="standardInput"
                                   name="endDate"
                                   type="date"
                                   value={endDate}
                                   onChange={(e) => setEndDate(e.target.value)}
                            />
                        </label>
                    </li>
                    <li>
                        <label>
                        <textarea
                            className="descriptionInput"
                            type="text"
                            name="postingDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"/>
                        </label>
                    </li>
                    <li>
                        <label>
                        <input className="standardInput"
                            name="numberOfGuests"
                            type="number"
                            value={capacity}
                            onChange={(e) => setCapacity(e.target.value)}
                            placeholder="Group Capacity"
                            />
                        </label>
                    </li>

                    <input className="submitButton" type="submit" value="Submit" onClick={() => createPost()}/>
                </ul>

                <button className="closeButton" onClick={() => setTrigger(false)}>close</button>
            </div>
        </div>
    ) : null;
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)




export default Popup