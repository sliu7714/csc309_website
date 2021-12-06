import React, {useState} from 'react';
import './profile-popup.css'
import TagRemovable from "../SearchTag/TagRemovable";

import { setProfileInfo } from '../../actions/user';

const ProfilePopup = ({profilePictures, trigger, setTrigger, user}) => {

    const [updateProfilePictureIndex, setProfilePictureIndex] = useState(user.profileImageIndex)
    const [updatedName, setName] = useState(user.name);
    const [updatedEmail, setEmail] = useState(user.email);
    const [updatedUsername, setUsername] = useState(user.username);
    const [updatedPassword, setPassword] = useState(user.password);
    const [updatedBio, setBio] = useState(user.bio);

    const [currentSearchText, setCurrentSearchText] = useState("")
    // a list of the text in the currently displayed tags
    const [currentCourses, setCurrentTags] = useState(user.courses)

    // add text from the search bar and clear the search bar
    const addCourse = () => {
        if (currentCourses.length !== 6){
            if (currentCourses.includes(currentSearchText)){
                console.log(`already added tag: ${currentSearchText}`)
            }else{
                setCurrentTags([...currentCourses, currentSearchText])
                setCurrentSearchText("")
            }
        }
    }

    const removeTag = (tagText) => {
        setCurrentTags(currentCourses.filter(tag => tag !== tagText))
    }

    return (trigger) ? (
        <div className="edit-profile-container">
            <div className="edit-profile-content-container">
                <h3 className="edit-profile-content-container__h3">Edit Profile Info</h3>
                <button className="edit-profile-content-container__button" onClick={() => setTrigger(false)}>Close</button>
                 
                <form className="edit-profile-content-container__form">
                    <div className="edit-profile-content-photos">
                        <div className="profile-picture-container--smaller profile-picture-container" title={(user.name).concat("'s ","profile icon")}>
                            <img src={profilePictures[updateProfilePictureIndex]} alt={(user.name).concat("'s ","profile icon")} className="profile-picture-container__image--smaller profile-picture-container__image"/>         
                        </div>
                        <div className="select-profile-picture-container">
                                <img src={profilePictures[0]} onClick={() => setProfilePictureIndex(0)} alt={"Smile"} title="Select Smiling Photo" className="selection-photo"/>         
                                <img src={profilePictures[1]} onClick={() => setProfilePictureIndex(1)} alt={"Chef"} title="Select Chef Photo" className="selection-photo"/>         
                                <img src={profilePictures[2]} onClick={() => setProfilePictureIndex(2)}c alt={"Fish"} title="Select Fish Photo" className="selection-photo"/>         
                        </div>
                    </div>
                    <div className="edit-profile-content-text">
                        <label className="edit-profile-content-container__form__label">Name: 
                            <input id="edit-profile-name" className="edit-profile-content-container__form__input" placeholder={user.name} onChange={e => setName(e.target.value)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Email: 
                            <input id="edit-profile-email" type="email" className="edit-profile-content-container__form__input" placeholder={user.email} onChange={e => setEmail(e.target.value)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Username: 
                            <input id="edit-profile-username" className="edit-profile-content-container__form__input" placeholder={user.username} onChange={e => setUsername(e.target.value)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Password: 
                            <input id="edit-profile-password" type="password" className="edit-profile-content-container__form__input" onChange={e => setPassword(e.target.value)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Bio:
                            <textarea id="edit-profile-bio" type="text" className="edit-profile-content-container__form__textarea"  placeholder="Tell Us About Yourself" rows="9" onChange={e => setBio(e.target.value)}>{user.bio}</textarea>
                        </label>
                        <div className="edit-profile-content-container-courses-container">
                            <input id="search_bar" type="text" value={currentSearchText} onChange={e => setCurrentSearchText(e.target.value)}/>
                            <button className="profile-contents-container__button" id="add_tag_btn" type="button" onClick={() => {addCourse()}}>Add Course</button>
                        </div>
                        
                        <div id='tags_container'>
                            {currentCourses.map(tagText => <TagRemovable  text={tagText} removeTag={removeTag}/>)}
                        </div>
                        <input className="edit-profile-content-container__form__submit" type="submit" onClick={()=>{setProfileInfo(updatedName,updatedEmail,updatedUsername,updatedPassword,updatedBio, updateProfilePictureIndex, currentCourses)}}/>
                    </div>                                                                                                                                     
                    
                </form>
            </div> 
        </div>
        
        ): null;
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)




export default ProfilePopup;