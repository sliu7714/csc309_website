import "./styles.css";
// import "./profile-popup.css";
import {users} from '../../data/data';
import { useState } from "react";
import ProfilePopup from "./ProfilePopup";

const UserHandle = (props) => {
    const [editProfilePopup, showEditProfilePopup] = useState(false);
    const [editProfileImage, setEditProfileImage] = useState(false);

    const user = props.user


    
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
            <ProfilePopup trigger={editProfilePopup} setTrigger={showEditProfilePopup} user={user} type="Profile"/>
            <div className="profile-picture-container" title={(user.name).concat("'s ","profile icon")}>

                <img src={user.image} alt={(user.name).concat("'s ","profile icon")} className="profile-picture-container__image"/>
                
                <div class="profile-picture-dropdown-content profile-photo-grid-container">
                    <div class="grid-photo">1</div>
                    <div class="grid-photo">2</div>
                    <div class="grid-photo">3</div>
                    <div class="grid-photo">4</div>
                    <div class="grid-photo">5</div>
                    <div class="grid-photo">6</div>
                    <div class="grid-photo">7</div>
                    <div class="grid-photo">8</div>
                    <div class="grid-photo">9</div>
                </div>
             
                
                {/* <ProfilePopup trigger={editProfileImage} setTrigger={setEditProfileImage} user={user1} type="Image"/> */}
            </div>
            <h1 className="profile-user-handle-container__h1" title="Name">{user.name}</h1>
            <h2 className="profile-user-handle-container__h2" title="Username">{user.username}</h2>
            <h3 className="profile-user-handle-container__h3" title="Email">{user.email}</h3>
        </div>
    )
}

export default UserHandle;




