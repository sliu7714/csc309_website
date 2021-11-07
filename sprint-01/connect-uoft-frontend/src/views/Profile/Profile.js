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
// import { BrowserRouter, Route } from "react-router-dom";


const userID = localStorage.getItem('userID')
const user = users[userID]
const _bio = user.bio
const _isAdmin = user.isAdmin
const _courses = user.courses
const _groups = user.postings

const Profile = () => {

    // const adminFunctions = <div id='column3'>
    //                        <ReportedUsers groups={_groups}/>
    //                        <ReportedGroups groups={_groups}/>
    //                        </div>

    // const logout = () =>{
    //     localStorage.setItem('userID', null)
    //     setUserID(undefined)
    // }

    const regUser = <div id="profile_page">
                        <UserHandle user={userID}/>
                        <div id='column1'>
                            <EditProfile user={userID}/>
                            <Stats user={userID}/>
                        </div>
                        <div id='column2'>
                            <Bio bio={_bio}/>
                            <Courses courses={_courses}/>
                        </div>
                        <div id='column3'>
                            <Groups groups={_groups}/>
                            <LeadGroups groups={_groups}/>
                        </div>
                        {/* <BrowserRouter>
                            <Route path="/logout" />
>                        </BrowserRouter>
                        <button onClick={logout}>logout (temporary - need additional refresh) userid: {userID}</button> */}
                        
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
                            <Groups groups={_groups}/>
                            
                        </div>
                        <div id='column3'>
                             <Courses courses={_courses}/>
                            <LeadGroups groups={_groups}/>
                            <ReportedGroups groups={_groups}/>
                        </div>
                        {/* <button onClick={logout}>logout (temporary - need additional refresh) userid: {userID}</button> */}

                    </div>
    return(
        <div>
            {/* Displays appropriate page depending on if the user is an admin or not */}
            {_isAdmin ? adminUser : regUser}
             
        </div>
    )


}

export default Profile