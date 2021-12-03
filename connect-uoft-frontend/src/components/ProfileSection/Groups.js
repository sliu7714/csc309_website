import "./styles.css"
import {useState} from 'react'



const Groups = (props) => {
    return (
        <div className='groupContent profile-container'>
            <h1 className="section_title">My Groups</h1>
            <ul className="groupsList">
                <li className="group">
                    <div className="group-image-container"> 
                    </div>
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Work on practice problems</h2>
                        <h3 className="group-content-container__h3">Creator: 0</h3>
                        <h4 className="group-content-container__h3">Description: To work on CSC309 Practice Problems</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                    </div>
                    
                </li>
            </ul>
        </div>
    )
}

const LeadGroups = (props) => {
    return(
        <div className='groupContent profile-container'>
            <h1 className="section_title">Lead Groups</h1>
            <ul className="groupsList">
                <li className="group">
                    <div className="group-image-container"> 
                    </div>
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Study for Test 2</h2>
                        <h3 className="group-content-container__h3">Creator: 1</h3>
                        <h4 className="group-content-container__h3">Description: We must study regularly for test 2</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                    </div>           
                </li>
            </ul>
        </div>
    )
}
export {Groups, LeadGroups}

