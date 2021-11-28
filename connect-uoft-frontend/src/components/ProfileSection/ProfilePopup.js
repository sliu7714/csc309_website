import React, {useState} from 'react';
import './profile-popup.css'

const ProfilePopup = ({trigger, setTrigger, user}) => {

    const [bio, setBio] = useState(user.bio);
    return (trigger) ? (
        <div className="edit-profile-container">
            <div className="edit-profile-content-container">
                <h3 className="edit-profile-content-container__h3">Edit Profile Info</h3>
                <button className="edit-profile-content-container__button" onClick={() => setTrigger(false)}>Close</button>
                
                <form className="edit-profile-content-container__form">
                    <label className="edit-profile-content-container__form__label">Name: </label>
                    <input className="edit-profile-content-container__form__input" placeholder={user.name}></input><br/>
                    <label className="edit-profile-content-container__form__label">Email: </label>
                    <input type="email" className="edit-profile-content-container__form__input" placeholder={user.email}></input><br/>
                    <label className="edit-profile-content-container__form__label">Username: </label>
                    <input className="edit-profile-content-container__form__input" placeholder={user.username}></input><br/>
                    <label className="edit-profile-content-container__form__label">Password: </label>
                    <input type="password" className="edit-profile-content-container__form__input"></input><br/>
                    <label className="edit-profile-content-container__form__label">Bio: </label>
                    <textarea type="text" className="edit-profile-content-container__form__textarea" rows="9" onChange={(b) => setBio(b)}>{bio}</textarea>
                    {/* Submission disabled for now */}
                    <input className="edit-profile-content-container__form__submit" type="submit" value="Submit" onSubmit={user.bio = bio}/>
                </form>
            </div> 
        </div>
        
        ): null;
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)




export default ProfilePopup;