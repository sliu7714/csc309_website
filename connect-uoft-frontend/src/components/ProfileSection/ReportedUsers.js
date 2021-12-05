// const ReportedUsers = ()=>{
//     return(
//         <div className="profile-container">
//             <h1 className="section_title">Reported Users</h1>
//             <table className="reported_users">
//                 <tbody>
//                     {/* {loadedGroups} */}
//                     <tr className="reported_user">
//                         <td>Timmy</td>
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


import "./styles.css"
import { useState } from "react"

const getReportedUsers = () => {
    // TODO
    return [];
}
const addAllReportedUsers = () => {
    const joinedGroups = getReportedUsers();
    for (const group in joinedGroups){
        addReportedUserToDOM(group.title, group.creator, group.description, group.link, group.members);
    }
}
const addReportedUserToDOM = (title, creator, description, link, members) =>{

    const groupContainer = document.getElementById("joined-groups");
    const group = document.createElement("div");
    group.className="group"
    
    const groupContent = document.createElement("div");
    groupContent.className="group-content-container";

    const titleContainer = document.createElement("h2");
    titleContainer.className="group-content-container__h2";
    const titleText = document.createTextNode(title);
    titleContainer.appendChild(titleText);

    const creatorContainer = document.createElement("h3");
    creatorContainer.className="group-content-container__h3";
    creatorContainer.textContent = "Creator: ".concat(creator);

    const descriptionContainer = document.createElement("h4");
    descriptionContainer.className="group-content-container__h4";
    descriptionContainer.textContent = description;

    const linkContainer = document.createElement("div");
    linkContainer.className="group-content-container-meeting";

    const linkLabel = document.createElement("p");
    linkLabel.className = "text";
    linkLabel.textContent = "Link:";

    const linkText = document.createElement("a");
    linkText.className = "group-content-container-link";
    linkText.href = link;
    linkText.textContent = "Meeting Link";
    linkText.title = link;

    linkContainer.appendChild(linkLabel);
    linkContainer.appendChild(linkText);

    const membersContainer = document.createElement("div");
    membersContainer.className = "group-member-list";

    const membersExtraDiv = document.createElement("div");
    const membersHeading = document.createElement("h2");
    membersHeading.className="group-content-container__h2";
    membersHeading.textContent="Members";

    membersExtraDiv.appendChild(membersHeading);
    for (const member in members){
        const memberContainer = document.createElement("div");
        memberContainer.className= "group-member-list-member";
        memberContainer.title = member.name;
        membersContainer.appendChild(memberContainer);
    }

    membersContainer.appendChild(membersExtraDiv);

    groupContent.appendChild(titleContainer);
    groupContent.appendChild(creatorContainer);
    groupContent.appendChild(descriptionContainer);
    groupContent.appendChild(linkContainer);
    groupContent.appendChild(membersContainer);

    group.appendChild(groupContent);
    groupContainer.appendChild(group);
}

const ReportedUsers = (props) => {
    return (
        <div className='reported-content profile-container'>
            <h1 className="section_title">Reported Users</h1>
            <div id="reported-groups" className="groups-list">
                {/* <div className="group">
                    <div className="group-content-container">
                        <h2 className="group-content-container__h2">Work on practice problems</h2>
                        <h3 className="group-content-container__h3">Creator: 0</h3>
                        <h4 className="group-content-container__h4">Description: We must work on practice problems for 309</h4>
                        <div className="group-content-container-meeting">
                            <p className="text"> Link: </p>
                            <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>
                        </div>
                        <div className="group-member-list">
                            <div>
                                <h2 className="group-content-container__h2">Members</h2>
                                <div className="group-member-list-member" title="Vladimir"></div>
                                <div className="group-member-list-member" title="Kate"></div>
                                <div className="group-member-list-member" title="Ian"></div>
                            </div>
                        </div>
                    </div>           
               </div>
                */}
               
               {(getReportedUsers().length === 0) ? <div>There are no users that have been reported</div>: addAllReportedUsers()}
            </div>
        </div>
    )
}

export default ReportedUsers