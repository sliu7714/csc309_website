import React, {useState} from 'react';
import './profile-popup.css'

const ProfilePopup = ({profilePictures, trigger, setTrigger, user}) => {

    const [bio, setBio] = useState(user.bio);
    return (trigger) ? (
        <div className="edit-profile-container">
            <div className="edit-profile-content-container">
                <h3 className="edit-profile-content-container__h3">Edit Profile Info</h3>
                <button className="edit-profile-content-container__button" onClick={() => setTrigger(false)}>Close</button>
                 
                <form className="edit-profile-content-container__form">
                    <div className="edit-profile-content-photos">
                        <div className="profile-picture-container--smaller profile-picture-container" title={(user.name).concat("'s ","profile icon")}>
                            <img src={profilePictures[user.imageIndex]} alt={(user.name).concat("'s ","profile icon")} className="profile-picture-container__image--smaller profile-picture-container__image"/>         
                        </div>
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
                    <div className="edit-profile-content-text">
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
                        <input className="edit-profile-content-container__form__submit" type="submit" value="Submit" onSubmit={user.bio = bio}/>
                    </div>
                    
                </form>
            </div> 
        </div>
        
        ): null;
}


//document.getElementsByClassName("tagForm")[0].addEventListener("submit", addTagFunction)




export default ProfilePopup;