import "./styles.css";
import { useState } from "react";
import ProfilePopup from "./ProfilePopup";
import {_profilePicturesWhite} from "../../data/constants"


const UserHandle = (props) => {
    const user1 = props.user;
    const _profilePicture = _profilePicturesWhite[user1.profileImageIndex];

    const [editProfilePopup, showEditProfilePopup] = useState(false);

    return (
        
        <div className="profile-user-handle-container">
            <div className="profile-picture-container" title={(user1.name).concat("'s ","profile icon")}>
                <img src={_profilePicture} alt={(user1.name).concat("'s ","profile icon")} className="profile-picture-container__image"/>                         
            </div>
            <div className="profile-user-handle-infotmation-container">
                <h1 className="profile-user-handle-container__h1" title="Name">{user1.name}</h1>
                <h2 className="profile-user-handle-container__h2" title="Username">{user1.username}</h2>
                <h3 className="profile-user-handle-container__h3" title="Email">{user1.email}</h3>
            </div>
            <div className="profile-user-handle-button-container">
                <button className="profile-user-handle-container__button" title="Edit Profile Information" onClick={() => showEditProfilePopup(true)} >
                    <img className="profile-user-handle-container__button__img" src={"/images/edit_icon.svg"} alt="Edit Profile Information"></img>
                </button>
            </div>
            <ProfilePopup trigger={editProfilePopup} setTrigger={showEditProfilePopup} user={user1} type="Profile"/>

        </div>
    )
}

export default UserHandle;




