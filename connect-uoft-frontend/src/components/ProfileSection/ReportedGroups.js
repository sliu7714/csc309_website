import "./styles.css"
import {unreportPost, deletePost} from "../../actions/postings"
import PostSection from "./PostSection";

const ReportedGroups = ({reportedPostings}) => {
    return (
        <div className='profile-card-background reported-content profile-container'>

            <h1 className="section_title">Reported Groups</h1>
            <div id="reported-groups" className="groups-list">
               
               { reportedPostings && reportedPostings.length > 0 ?
                   reportedPostings.map(post =>
                       <div className="group">
                           <PostSection post={post}/>

                            <div className="group-button-container">
                                <form>
                                    <button className="group-button-container__button" onClick={()=> unreportPost(post._id)}>Un-Report</button>
                                    <button className="group-button-container__button group-button-container__button--red" onClick={()=> deletePost(post._id)}>Delete</button>
                                </form>
                            </div>
                        </div>)
                   :
                   <div>There are no groups that have been reported</div>
               }
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