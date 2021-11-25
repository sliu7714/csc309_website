import "./styles.css";
import "./profile-popup.css";
import {users} from '../../data/data';
import { useState } from "react";

const UserHandle = (props) => {
    const user = users[props.user];
    const [editProfilePopup, setEditProfilePopup] = useState(false);
    return (
        
        <div className="profile-user-handle-container">
            <button className="profile-user-handle-container__button" title="Edit Profile Information" onClick={() => setEditProfilePopup(true)}>

                <img className="profile-user-handle-container__button__img" src="/images/edit_icon.svg" alt="Edit Profile Information"></img>
            </button>
            <div className="profile-picture-container" title={(user.name).concat("'s ","profile icon")}>
                <img src={user.image} alt={(user.name).concat("'s ","profile icon")} className="profile-picture-container__image"/>
            </div>
            <h1 className="profile-user-handle-container__h1">{user.name}</h1>
            <h2 className="profile-user-handle-container__h2">{user.username}</h2>
            <h3 className="profile-user-handle-container__h3">{user.email}</h3>
        </div>
    )
}

export default UserHandle;




