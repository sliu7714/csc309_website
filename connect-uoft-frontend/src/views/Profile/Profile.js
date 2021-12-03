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
import './styles.css'



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


    const regUser = <div id="profile_page">
                        <UserHandle user={userID}/>
                        <div className="noGroupContainer">
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
                        <div className="groupsContentContainer">
                                <Groups groups={_groups} user={userID}/>
                                <LeadGroups groups={_groups}/>
                        </div>
                    </div>

    const adminUser = <div id="profile_page">
                        <UserHandle user={userID}/>
                        {/* <EditProfile user={userID}/> */}
                        <div id='column1'>
                            <EditProfile user={userID}/>
                            <Stats user={userID}/>
                            <ReportedUsers groups={_groups}/>
                        </div>
                        <div id='column2'>
                            <Bio bio={_bio}/>
                            <Groups groups={_groups} user={userID}/>
                            
                        </div>
                        <div id='column3'>
                            <Courses courses={_courses} user={userID}/>
                            <LeadGroups groups={_groups} user={userID}/>
                            <ReportedGroups groups={_groups}/>
                        </div>

                    </div>
    return(
        <div>
            {/* Displays appropriate page depending on if the user is an admin or not */}
            {_isAdmin ? adminUser : regUser}
             
        </div>
    )


}

export default Profile