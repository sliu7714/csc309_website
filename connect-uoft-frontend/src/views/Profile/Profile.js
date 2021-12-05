import { useState, useEffect} from "react";
import './styles.css'
import ENV from '../../config'
import { users } from "../../data/data";
import Bio from "../../components/ProfileSection/Bio";
import UserHandle from "../../components/ProfileSection/UserHandle";
import Courses  from "../../components/ProfileSection/Courses";
import {Groups, LeadGroups} from "../../components/ProfileSection/Groups";
import ReportedGroups from "../../components/ProfileSection/ReportedGroups";
import ReportedUsers from "../../components/ProfileSection/ReportedUsers";
import EditProfile from "../../components/ProfileSection/EditProfileInfo";
import Stats from "../../components/ProfileSection/Stats";

// import profilePic1 from "/images/Timmy_Turner1.png";
// import profilePic2 from "/images/profile-pictures/chef.svg";
// import profilePic3 from "/images/profile-pictures/fish.svg";
const _profilePictures = ["/images/profile-pictures/smiley.svg", "/images/profile-pictures/chef.svg", "/images/profile-pictures/fish.svg"]
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
                <div className="groups-content-container">
                        <Groups groups={user.postings} user={userID}/>
                        <LeadGroups groups={user.postings}/>
                </div>
                {user.isAdmin ? <div className="reported-content-container">
                                <ReportedUsers resportedUsers={user.groups}/>
                                <ReportedGroups reportedGroups={user.groups}/>
                            </div>           
                : null}
        </div>
    )


}

export default Profile