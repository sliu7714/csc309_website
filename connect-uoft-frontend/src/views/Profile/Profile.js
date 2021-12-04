import { useState, useEffect} from "react";
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
import ENV from '../../config'
const BASE_API_URL = ENV.apiBaseUrl



const Profile = ({userID, isAdmin}) => {
    // const user = users[userID]
    const [user, setUser] = useState()

    // const _bio = user.bio // TODO change to state variables...
    // const _isAdmin = user.isAdmin
    // const _courses = user.courses
    // const _groups = user.postings

    useEffect(() =>{
        fetch(`${BASE_API_URL}/api/user`)
            .then((res) =>{
                if(!res.ok){
                    console.log("could not find user ", res.status)
                    return;
                }
                return res.json()
            })
            .then((userInfo) =>{
                if (userInfo){
                    console.log(userInfo)
                    setUser(userInfo)
                }
            })
            .catch((err) =>{
                console.log("error with getting profile info: ", err)
            })
    }, [])

    // const adminFunctions = <div id='column3'>
    //                        <ReportedUsers groups={_groups}/>
    //                        <ReportedGroups groups={_groups}/>
    //                        </div>
    if(!user){
        return(
            <div>
                No user found. Please
                <a href='/login'>login</a>
            </div>
        )
    }

    const regUser = <div id="profile_page">
                        <UserHandle user={userID}/>
                        <div className="noGroupContainer">
                            <div id='column1'>
                                <Bio bio={user.bio}/>
                                {/* <Courses courses={_courses}/> */}
                            </div>
                            <div id='column2'>
                                <Courses courses={user.courses}/>
                            </div>
                            <div id='column3'>
                                <Stats user={userID}/>
                            </div>

                        </div>
                        <div className="groupsContentContainer">
                                <Groups groups={user.groups} user={userID}/>
                                <LeadGroups groups={user.groups}/>
                        </div>
                    </div>

    const adminUser = <div id="profile_page">
                        <UserHandle user={userID}/>
                        {/* <EditProfile user={userID}/> */}
                        <div id='column1'>
                            <EditProfile user={userID}/>
                            <Stats user={userID}/>
                            <ReportedUsers groups={user.groups}/>
                        </div>
                        <div id='column2'>
                            <Bio bio={user.bio}/>
                            <Groups groups={user.groups} user={userID}/>

                        </div>
                        <div id='column3'>
                            <Courses courses={user.courses} user={userID}/>
                            <LeadGroups groups={user.groups} user={userID}/>
                            <ReportedGroups groups={user.groups}/>
                        </div>

                    </div>


    return(
        <div id='user-profile-page'>
            {/* Displays appropriate page depending on if the user is an admin or not */}

            {/*{isAdmin ? adminUser : regUser}*/}
            <UserHandle user={user}/>
            <div className="noGroupContainer">
                <div id='column1'>
                    <Bio user={user}/>
                    {/* <Courses courses={_courses}/> */}
                </div>
                <div id='column2'>
                    <Courses courses={user.courses}/>
                </div>
                <div id='column3'>
                    <Stats user={userID}/>
                </div>

            </div>
            <div className="groupsContentContainer">
                <Groups groups={user.groups} user={userID}/>
                <LeadGroups groups={user.groups}/>
            </div>

            {/*<div id="profile_page">*/}
            {/*    <UserHandle user={user} />*/}
            {/*    /!* <EditProfile user={userID}/> *!/*/}
            {/*    <div id='column1'>*/}
            {/*        <EditProfile user={userID}/>*/}
            {/*        <Stats user={userID}/>*/}
            {/*        {isAdmin &&  <ReportedUsers groups={user.groups}/>}*/}

            {/*    </div>*/}
            {/*    <div id='column2'>*/}
            {/*        <Bio bio={user.bio}/>*/}
            {/*        <Groups groups={user.groups} user={userID}/>*/}

            {/*    </div>*/}
            {/*    <div id='column3'>*/}
            {/*        <Courses courses={user.courses} user={userID}/>*/}
            {/*        <LeadGroups groups={user.groups} user={userID}/>*/}
            {/*        {isAdmin && <ReportedGroups groups={user.groups}/>}*/}
            {/*    </div>*/}

            {/*</div>*/}
             
        </div>
    )


}

export default Profile