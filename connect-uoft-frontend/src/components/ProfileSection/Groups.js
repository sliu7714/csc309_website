import "./styles.css"
import {useState} from 'react'



const Groups = (props) => {
    return (
        <div className='group-content profile-container'>
            <h1 className="section_title">My Groups</h1>
            <div className="group-list">
                <div className="group">
                    <div className="group-image-container"> 
                    </div>
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Work on practice problems</h2>
                        <h3 className="group-content-container__h3">Creator: 0</h3>
                        <h4 className="group-content-container__h4">Description: We must work on practice problems for 309</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                        <div className="group-member-list">
                            <div className="group-content-container__h2">
                                <h2>Members</h2>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                            </div>
                        </div>
                    </div>           
               </div>
               <div className="group">
                    <div className="group-image-container"> 
                    </div>
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Draw In The Park</h2>
                        <h3 className="group-content-container__h3">Creator: 0</h3>
                        <h4 className="group-content-container__h3">Description: We draw in the park by campus</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                        <div className="group-member-list">
                            <div className="group-content-container__h2">
                                <h2>Members</h2>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                            </div>
                        </div>
                    </div>           
               </div>
               <div className="group">
                    <div className="group-image-container"> 
                    </div>
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Draw In The Park</h2>
                        <h3 className="group-content-container__h3">Creator: 0</h3>
                        <h4 className="group-content-container__h3">Description: We draw in the park by campus</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                        <div className="group-member-list">
                            <div className="group-content-container__h2">
                                <h2>Members</h2>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                            </div>
                        </div>
                    </div>           
               </div>
            </div>
        </div>
    )
}

const LeadGroups = (props) => {
    return(
        <div className='group-content profile-container'>
            <h1 className="section_title">Lead Groups</h1>
            <div className="group-list">
                <div className="group">
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
               </div>
            </div>
        </div>
    )
}
export {Groups, LeadGroups}

