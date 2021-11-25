import "./styles.css"
import {useState} from 'react'


// class Group{
//     constructor(name){
//         this.name = name
//     }
// }
const Groups = (props) => {
    // const groupStates = []
    // const groupsSize = props._groups.length
    // const preGroups = ((group) => {
    //     groupStates.push(false)
    // })

    // const [gS, setGroupstates] = useState(groupStates)
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
        <div className='profile-container'>
            <h1 className="section_title">My Groups</h1>
            <table className="groups">
                <tbody>
                    <tr className="group">
                        <td>Posting 2</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                    </tr>
                    {/* {loadedGroups} */}
                    
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
        <div className='profile-container'>
            <h1 className="section_title">Lead Groups</h1>
            <table className="groups">
                <tbody>
                    <tr className="group">
                        <td>Posting 0</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                    </tr>
                    <tr className="group">
                        <td>Posting 1</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export {Groups, LeadGroups}

