const ReportedUsers = ()=>{

    // TODO: get api call here

    return(
        <div className="profile-container profile-card-background">
            <h1 className="section_title">Reported Users</h1>
            <table className="reported_users">
                <tbody>
                    {/* {loadedGroups} */}
                    <tr className="reported_user">
                        <td>Timmy</td>
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

export default ReportedUsers