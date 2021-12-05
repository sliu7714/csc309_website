import { useState } from "react";
import { users } from "../../data/data";
import Bio from "../../components/ProfileSection/Bio";
import UserHandle from "../../components/ProfileSection/UserHandle";
import Courses  from "../../components/ProfileSection/Courses";
import {Groups, LeadGroups} from "../../components/ProfileSection/Groups";
import ReportedGroups from "../../components/ProfileSection/ReportedGroups";
import ReportedUsers from "../../components/ProfileSection/ReportedUsers";
import EditProfile from "../../components/ProfileSection/EditProfileInfo";
import Stats from "../../components/ProfileSection/Stats";
import './styles.css';
// import profilePic1 from "/images/Timmy_Turner1.png";
// import profilePic2 from "/images/profile-pictures/chef.svg";
// import profilePic3 from "/images/profile-pictures/fish.svg";
const _profilePictures = ["/images/profile-pictures/smiley.svg", "/images/profile-pictures/chef.svg", "/images/profile-pictures/fish.svg"]


const Profile = ({userID}) => {
    const user = users[userID]
    const _bio = user.bio
    const _isAdmin = user.isAdmin
    const _courses = user.courses
    const _groups = user.postings


    // const adminFunctions = <div id='column3'>
    //                        <ReportedUsers groups={_groups}/>
    //                        <ReportedGroups groups={_groups}/>
    //                        </div>


    // const regUser = <div id="profile_page">
    //                     <UserHandle profilePictures={_profilePictures} user={userID}/>
    //                     <div className="noGroupContainer">
    //                         <div id='column1'>
    //                             <Bio bio={_bio}/>
    //                             {/* <Courses courses={_courses}/> */}
    //                         </div>
    //                         <div id='column2'>
    //                             <Courses courses={_courses}/>
    //                         </div>
    //                         <div id='column3'>
    //                             <Stats user={userID}/>
    //                         </div>
                            
    //                     </div>
    //                     <div className="groupsContentContainer">
    //                             <Groups groups={_groups} user={userID}/>
    //                             <LeadGroups groups={_groups}/>
    //                     </div>
    //                 </div>

    // const adminUser = <div id="profile_page">
    //                     <UserHandle  profilePictures={_profilePictures} user={userID}/>
    //                     <div className="noGroupContainer">
    //                         <div id='column1'>
    //                             <Bio bio={_bio}/>
    //                             {/* <Courses courses={_courses}/> */}
    //                         </div>
    //                         <div id='column2'>
    //                             <Courses courses={_courses}/>
    //                         </div>
    //                         <div id='column3'>
    //                             <Stats user={userID}/>
    //                         </div>
                            
    //                     </div>
    //                     <div className="groupsContentContainer">
    //                             <Groups groups={_groups} user={userID}/>
    //                             <LeadGroups groups={_groups}/>
    //                     </div>
    //                     <div className="reportedContentContainer">
    //                             <ReportedUsers resportedUsers={_groups}/>
    //                             <ReportedGroups reportedGroups={_groups}/>
    //                     </div>
    //                     {/* <div id='column1'>
    //                         <EditProfile user={userID}/>
    //                         <Stats user={userID}/>
    //                         <ReportedUsers groups={_groups}/>
    //                     </div>
    //                     <div id='column2'>
    //                         <Bio bio={_bio}/>
    //                         <Groups groups={_groups} user={userID}/>
                            
    //                     </div>
    //                     <div id='column3'>
    //                         <Courses courses={_courses} user={userID}/>
    //                         <LeadGroups groups={_groups} user={userID}/>
    //                         <ReportedGroups groups={_groups}/>
    //                     </div> */}

    //                 </div>
    return(
        // <div>
        //     {/* Displays appropriate page depending on if the user is an admin or not */}
        //     {_isAdmin ? adminUser : regUser}
             
        // </div>
        <div id="profile_page">
                <div className="user-container">
                    <UserHandle profilePictures={_profilePictures} user={userID}/>

                </div>
                <div className="no-group-container">
                    <div id='column1'>
                        <Bio bio={_bio}/>
                        {/* <Courses courses={_courses}/> */}
                    </div>
                    <div id='column2'>
                        <Courses courses={_courses}/>
                    </div>
                    <div id='column3'>
                        <Stats user={userID}/>
                    </div>
                    
                </div>
                <div className="groups-content-container">
                        <Groups groups={_groups} user={userID}/>
                        <LeadGroups groups={_groups}/>
                </div>
                {_isAdmin ? <div className="reported-content-container">
                                <ReportedUsers resportedUsers={_groups}/>
                                <ReportedGroups reportedGroups={_groups}/>
                            </div>           
                : null}
        </div>
    )


}

export default Profile