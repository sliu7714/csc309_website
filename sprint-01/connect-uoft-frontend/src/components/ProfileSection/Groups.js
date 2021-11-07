import "./styles.css"
import {useState} from 'react'
import { users,postings } from "../../data/data"


// class Group{
//     constructor(name){
//         this.name = name
//     }
// }
const Groups = (props) => {

    const [viewing, setViewing] = useState(false)
    // const preGroups = props._groups
    // const personalgroups = postings.filter(posting => posting.members.includes(props.userID))
    const details = <td>: More Details About Group</td>
    // CURRENTLY NOT WORKING
    // const loadedGroups = personalgroups.map((posting)  => {
    //     return <tr className="group">
    //                     <td>{posting.title}</td>

    //                     <td><button className="_button">Manage</button></td>
    //                 </tr>
    // })
    // console.log(loadedGroups)
       
    const viewMore = () => {
        setViewing(!viewing)
    }
    return (
        <div className='pcontainer'>
            <h1 className="section_title">My Groups</h1>
            <table className="groups">
                <tbody>
                    {/* {loadedGroups} */}
                    <tr className="group">
                        <td>Posting 0</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                    </tr>
                    {/* <tr className="group">
                        <td>CSC343 Study Session</td>
                        <td><button className="_button">Manage</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}


const LeadGroups = (props) => {
    const [viewing, setViewing] = useState(false)

    const details = <td>: More Details About Group</td>
    const viewMore = () => {
        setViewing(!viewing)
    }

    return(
        <div className='pcontainer'>
            <h1 className="section_title">Lead Groups</h1>
            <table className="groups">
                <tbody>
                    <tr className="group">
                        <td>Posting 0</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                    </tr>
                    {/* <tr className="group">
                        <td>CSC309 Study Session</td>
                        <td><button className="_button">Manage</button></td>
                    </tr>
                    <tr className="group">
                        <td>CSC309 Meet Up</td>
                        <td><button className="_button">Manage</button></td>
                    </tr> */}
                </tbody>
            </table>
        </div>
    )
}
export {Groups, LeadGroups}

