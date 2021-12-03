import "./styles.css"
import { useState } from "react"


const ReportedGroups = () =>{

    const [viewing, setViewing] = useState(false)
    const details = <td>: More Details About Group</td>

    const viewMore = () => {
        setViewing(!viewing)
    }
    return(
        <div className="profile-container profile-card-background">
            <h1 className="section_title">Reported Groups</h1>
            <table className="groups">
                <tbody>
                    {/* {loadedGroups} */}
                    <tr className="group">
                        <td>Posting 0</td>
                        {viewing  ? details: null}
                        <td><button className="_button" onClick={viewMore}>{viewing ? 'View Less': 'View More'}</button></td>
                        <td></td>
                        <td><button className="_button">Manage</button></td>

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

export default ReportedGroups