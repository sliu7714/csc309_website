import "./styles.css"
import { useState, useEffect } from "react"
import {getReportedPost, unreportPost, deletePost} from "../../actions/postings"
import {getProfileInfoNotSignedIn} from "../../actions/user"

const ReportedGroups = (props) => {
    const [reportedPostings, setPostings] = useState([])
    const [creatorUser, setCreatorUser] = useState("")
    const getReportedGroups = () => {
        getReportedPost(setPostings)
    }

     const getProfileName = (toGetMember) => {
        getProfileInfoNotSignedIn(toGetMember, setCreatorUser)
        return creatorUser.name
    }
    // GET REPORTED POSTINGS ON LOAD
    useEffect(() =>{
        getReportedGroups()
    },[])
    return (
        <div className='profile-card-background reported-content profile-container'>

            <h1 className="section_title">Reported Groups</h1>
            <div id="reported-groups" className="groups-list">
               
               {(reportedPostings.length === 0) ? <div>There are no groups that have been reported</div>: 
               reportedPostings.map(post =>  <div className="group">
                                                <div className="group-content-container">
                                                    <h2 className="group-content-container__h2">{post.title}</h2>
                                                    <h3 className="group-content-container__h3">Creator: {getProfileName(post.creatorID)}</h3>
                                                    <h4 className="group-content-container__h4">Description: {post.description}</h4>
                                                </div>
                                                <div className="group-button-container">
                                                    <form>
                                                        <button className="group-button-container__button" onClick={()=> unreportPost(post._id)}>Un-Report</button>
                                                        <button className="group-button-container__button group-button-container__button--red" onClick={()=> deletePost(post._id)}>Delete</button>
                                                    </form>
                                                </div>
                                            </div>)}
            </div>
        </div>
    )
}






// const ReportedGroups = () =>{

//     const [viewing, setViewing] = useState(false)
//     const details = <td>: More Details About Group</td>

//     const viewMore = () => {
//         setViewing(!viewing)
//     }
//     return(
//         <div className="profile-container">
//             <h1 className="section_title">Reported Groups</h1>
//             <table className="groups">
//                 <tbody>
//                     {/* {loadedGroups} */}
//                     <tr className="group">
//                         <td>Posting 0</td>
//                         {viewing  ? details: null}
//                         <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
//                         <td></td>
//                         <td><button className="_button">Manage</button></td>

//                     </tr>
//                     {/* <tr className="group">
//                         <td>CSC343 Study Session</td>
//                         <td><button className="_button">Manage</button></td>
//                     </tr> */}
//                 </tbody>
//             </table>
//         </div>
//     )
// }

export default ReportedGroups