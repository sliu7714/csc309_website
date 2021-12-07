import "./styles.css"
import { useState, useEffect} from "react";

import { getUserCreatedPostings, getUserMemberPostings } from "../../actions/postings";
import { getProfileInfoNotSignedIn } from "../../actions/user";


const Groups = (props) => {

    const [postings, setPostings] = useState([])
    const [member, setMember] = useState([])
    const getUserPostings = () => {
        getUserMemberPostings(setPostings)
    }
     const getProfile = (toGetMember) => {
        getProfileInfoNotSignedIn(toGetMember, setMember)
        return member.name
    }
    // GET JOINED POSTINGS
    useEffect(() =>{
        getUserPostings()
    },[])
    return (
        <div className='group-content profile-container profile-card-background'>
            <h1 className="section_title">My Groups</h1>
            <div id="joined-groups" className="groups-list">         
               {(postings.length === 0) ? <div>You Have Not Joined Any Groups</div>:
               postings.map(post =>  <div className="group">
                                                <div className="group-content-container">
                                                    <h2 className="group-content-container__h2">{post.title}</h2>
                                                    <h3 className="group-content-container__h3">Creator: {props.user.username}</h3>
                                                    <h4 className="group-content-container__h4">Description: {post.description}</h4>
                                                    <div className="group-content-container-meeting">
                                                        <p className="text"> Link: </p>
                                                        <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                                                    </div>
                                                    <div className="group-member-list">
                                                        <h2 className="group-content-container__h2">Members</h2>
                                                    {post.members.map(member =>  <div className="group-member-list-member" title={(getProfile(member))}></div> )}

                                                    </div>
                                                </div>
                                            </div>)}
            </div>
        </div>
    )
}


const LeadGroups = (props) => {
    const [postings, setPostings] = useState([])
    const [member, setMember] = useState([])
    const getUserCreatePostings = () => {
        getUserCreatedPostings(setPostings)
    }
    const getProfile = (toGetMember) => {
        getProfileInfoNotSignedIn(toGetMember, setMember)
        return member.name
    }
    // GET JOINED POSTINGS ON LOAD
    useEffect(() =>{
        getUserCreatePostings()
    },[])
    return (
        <div className='group-content profile-container profile-card-background'>
            <h1 className="section_title">Lead Groups</h1>
            <div id="created-groups" className="groups-list">         
               {(postings.length === 0) ? <div>You Have Not Created Any Groups</div>:
               postings.map(post =>  <div className="group">
                                                <div className="group-content-container">
                                                    <h2 className="group-content-container__h2">{post.title}</h2>
                                                    <h3 className="group-content-container__h3">Creator: {props.user.username}</h3>
                                                    <h4 className="group-content-container__h4">Description: {post.description}</h4>
                                                    <div className="group-content-container-meeting">
                                                        <p className="text"> Link: </p>
                                                        <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                                                    </div>
                                                    <div className="group-member-list">
                                                        <div>
                                                        <h2 className="group-content-container__h2">Members</h2>
                                                        {post.members.map(member1 =>  <div className="group-member-list-member">{(getProfile(member1))}</div> )}
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>)}
            </div>
        </div>
    )























    // return(
    //     <div className='group-content profile-card-background profile-container'>
    //         <h1 className="section_title">Lead Groups</h1>
    //         <div id="created-groups" className="groups-list">
    //             {/* <div className="group">
    //                 <div className="group-content-container">
    //                     <h2 className="group-content-container__h2">Study for Test 2</h2>
    //                     <h3 className="group-content-container__h3">Creator: 1</h3>
    //                     <h4 className="group-content-container__h3">Description: We must study regularly for test 2</h4>
    //                     <div className="group-content-container-meeting">
    //                         <p className="text"> Link: </p>
    //                         <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
    //                     </div>
    //                     <div className="group-member-list">
    //                         <div>
    //                             <h2 className="group-content-container__h2">Members</h2>
    //                             <div className="group-member-list-member" title="Vladimir"></div>
    //                             <div className="group-member-list-member" title="Kate"></div>
    //                             <div className="group-member-list-member" title="Ian"></div>
    //                         </div>
    //                     </div>
    //                 </div>           
    //            </div> */}
    //            {(getCreatedGroups().length === 0)? <div>You Have Not Created Any Groups</div>:  addAllCreatedGroups()}
    //         </div>
    //     </div>
    // )
}
export {Groups, LeadGroups}

