import React, {useState} from 'react';
import './profile-popup.css'



const ProfilePopup = ({profilePictures, trigger, setTrigger, user}) => {
    const [updatedName, setName] = useState(user.name);
    const [updatedEmail, setEmail] = useState(user.email);
    const [updatedUsername, setUsername] = useState(user.username);
    const [updatedPassword, setPassword] = useState(user.password);
    const [updatedBio, setBio] = useState(user.bio);

   
    return (trigger) ? (
        <div className="edit-profile-container">
            <div className="edit-profile-content-container">
                <h3 className="edit-profile-content-container__h3">Edit Profile Info</h3>
                <button className="edit-profile-content-container__button" onClick={() => setTrigger(false)}>Close</button>
                 
                <form className="edit-profile-content-container__form">
                    <div className="edit-profile-content-photos">
                        <div className="profile-picture-container--smaller profile-picture-container" title={(user.name).concat("'s ","profile icon")}>
                            <img src={profilePictures[user.profileImageIndex]} alt={(user.name).concat("'s ","profile icon")} className="profile-picture-container__image--smaller profile-picture-container__image"/>         
                        </div>
                        <div className="select-profile-picture-container">
                            {/* <div class="grid-photo"> */}
                                <img src={profilePictures[0]} alt={"Smile"} title="Select Smiling Photo" className="selection-photo"/>         
                            {/* </div> */}
                            {/* <div class="grid-photo"> */}
                                <img src={profilePictures[1]} alt={"Chef"} title="Select Chef Photo" className="selection-photo"/>         
                            {/* </div> */}
                            {/* <div class="grid-photo">                                 */}
                                <img src={profilePictures[2]} alt={"Fish"} title="Select Fish Photo" className="selection-photo"/>         
                            {/* </div> */}
                        </div>
                    </div>
                    <div className="edit-profile-content-text">
                        <label className="edit-profile-content-container__form__label">Name: 
                            <input id="edit-profile-name" className="edit-profile-content-container__form__input" placeholder={user.name} onChange={(name) => setBio(name)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Email: 
                            <input id="edit-profile-email" type="email" className="edit-profile-content-container__form__input" placeholder={user.email} onChange={(email) => setBio(email)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Username: 
                            <input id="edit-profile-username" className="edit-profile-content-container__form__input" placeholder={user.username} onChange={(username) => setUsername(username)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Password: 
                            <input id="edit-profile-password" type="password" className="edit-profile-content-container__form__input" onChange={(pass) => setPassword(pass)}></input>
                        </label>
                        <label className="edit-profile-content-container__form__label">Bio:
                            <textarea id="edit-profile-bio" type="text" className="edit-profile-content-container__form__textarea" placeholder="Tell Us About Yourself" rows="9" onChange={(b) => setBio(b)}>{updatedBio}</textarea>
                        </label>
                        <input className="edit-profile-content-container__form__submit" type="submit" value="Submit" />
                        {/* onSubmit={handleSubmit(updatedName,updatedEmail,updatedUsername,updatedPassword,updatedBio)} */}
                    </div>                                                                                                                                     
                    
                </form>
            </div> 
        </div>
        
        ): null;
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)




export default ProfilePopup;