import "./styles.css";
// import "./profile-popup.css";
import {users} from '../../data/data';
import { useState } from "react";
import ProfilePopup from "./ProfilePopup";

const UserHandle = (props) => {
    const user1 = users[props.user];
    const [editProfilePopup, showEditProfilePopup] = useState(false);
    const [editProfileImage, setEditProfileImage] = useState(false);

    
    // const handleEdit = () => {
    //     // createSection

    //     setEditProfilePopup(false);
    //     return (editProfilePopup) ? (
    //    <div className="edit-profile-container">
    //         <div className="edit-profile-content-container">
    //             <button className="edit-profile-content-container__button" onClick={() => setEditProfilePopup(false)}>close</button>
    //         </div>
    //     </div>
    //     ): null;
    // }


    return (
        
        <div className="profile-user-handle-container">
            <button className="profile-user-handle-container__button" title="Edit Profile Information" onClick={() => showEditProfilePopup(true)} >
                <img className="profile-user-handle-container__button__img" src="/images/edit_icon.svg" alt="Edit Profile Information"></img>
            </button>
            <ProfilePopup trigger={editProfilePopup} setTrigger={showEditProfilePopup} user={user1} type="Profile"/>
            <div className="profile-picture-container" title={(user1.name).concat("'s ","profile icon")}>
        
                <img src={user1.image} alt={(user1.name).concat("'s ","profile icon")} className="profile-picture-container__image"/>
                {/* <ProfilePopup trigger={editProfileImage} setTrigger={setEditProfileImage} user={user1} type="Image"/> */}
            </div>
            <h1 className="profile-user-handle-container__h1" title="Name">{user1.name}</h1>
            <h2 className="profile-user-handle-container__h2" title="Username">{user1.username}</h2>
            <h3 className="profile-user-handle-container__h3" title="Email">{user1.email}</h3>
        </div>
    )
}

export default UserHandle;




