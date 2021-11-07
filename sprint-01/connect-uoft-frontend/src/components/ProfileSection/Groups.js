import "./styles.css"
import { users,postings } from "./Extra/data"


// class Group{
//     constructor(name){
//         this.name = name
//     }
// }
const Groups = (props) => {
    // const groups = props._groups
    // const preLoad = () =>{

    //     const group = document.createElement('tr')
    //     group.className="group"

    //     const name = document.createTextNode()
    // }
    return (
        <div className='pcontainer'>
            <h1 className="section_title">My Groups</h1>
            <table className="groups">
                <tbody>
                    {/* {preLoad} */}
                    <tr className="group">
                        <td>CSC309 Study Session</td>
                        <td><button className="_button">Manage</button></td>
                    </tr>
                    <tr className="group">
                        <td>CSC343 Study Session</td>
                        <td><button className="_button">Manage</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}


const LeadGroups = (props) => {
    return(
        <div className='pcontainer'>
            <h1 className="section_title">Lead Groups</h1>
            <table className="groups">
                <tbody>
                    <tr className="group">
                        <td>CSC309 Study Session</td>
                        <td><button className="_button">Manage</button></td>
                    </tr>
                    <tr className="group">
                        <td>CSC309 Meet Up</td>
                        <td><button className="_button">Manage</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export {Groups, LeadGroups}

