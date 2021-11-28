
import {useState} from 'react'
import "./styles.css"


const Bio = (props) =>{

    function getBio(){
        return props.bio
        // Pulls the users bio from the Profile Page
    }

    return (
        <div className="profile-container">
            <div className="contents-container">
                <h1 className="contents-container__h1">About Me</h1>
                {/* Initializes the Bio with a stored bio and then saving will require a server call*/}
                <p className="contents-container__p">{getBio()}</p>
                {/* <textarea border={!isEdit} id="bio" placeholder="Tell us about yourself!" rows="8" cols="60" disabled={!isEdit} onChange={(b) => setBio(b)}>{bioDescription}</textarea>  */}
                {/* <button id="edit_button" className="_button" onClick={handleClick}>{isEdit ? 'Submit' : 'Edit'}</button> */}
            </div>        
        </div>
    );

};

export default Bio;
