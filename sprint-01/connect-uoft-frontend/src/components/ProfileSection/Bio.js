
import {useState} from 'react'
import "./styles.css"


const Bio = (props) =>{

    const [bioDescription, setBio] = useState(props.bio)
    const [isEdit, updateEditState] = useState(false)
    
    const handleClick =() =>{
        updateEditState(!isEdit)
        
    }
    console.log(bioDescription)
    return (
        <div className="pcontainer">
            <h1 className="section_title">About Me</h1>
            <div>
                {/* Initializes the Bio with a stored bio and then saving will require a server call*/}
                <textarea id="bio" placeholder="Tell us about yourself!" rows="8" cols="60" disabled={!isEdit} onChange={(b) => setBio(b)}>{bioDescription}</textarea> 
                <button id="edit_button" className="_button" onClick={handleClick}>{isEdit ? 'Submit' : 'Edit'}</button>
            </div>
        </div>
    );

    //  onChange={b => setBio(b)}
    // value={bioDescription}

};

export default Bio;
