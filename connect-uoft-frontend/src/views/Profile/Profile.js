import { useState, useEffect} from "react";
import './styles.css'
import {getProfileInfo} from "../../actions/user";
import { users } from "../../data/data";
import Bio from "../../components/ProfileSection/Bio";
import UserHandle from "../../components/ProfileSection/UserHandle";
import Courses  from "../../components/ProfileSection/Courses";
import {Groups, LeadGroups} from "../../components/ProfileSection/Groups";
import ReportedGroups from "../../components/ProfileSection/ReportedGroups";
import ReportedUsers from "../../components/ProfileSection/ReportedUsers";
import Stats from "../../components/ProfileSection/Stats";


// import profilePic1 from "/images/Timmy_Turner1.png";
// import profilePic2 from "/images/profile-pictures/chef.svg";
// import profilePic3 from "/images/profile-pictures/fish.svg";
const _profilePictures = ["/images/profile-pictures/smiley.svg", "/images/profile-pictures/chef.svg", "/images/profile-pictures/fish.svg"]


const Profile = ({userID, isAdmin}) => {
    // const user = users[userID]
    const [user, setUser] = useState()

    useEffect(() =>{
        getProfileInfo(setUser)
    }, [])

    if(!user){
        return(
            <div>
                No user found. Please
                <a href='/login'>login</a>
            </div>
        )
    }
    return(
        <div id="profile_page">
                <div className="user-container">
                    <UserHandle profilePictures={_profilePictures} user={user}/>

                </div>
                <div className="no-group-container">
                    <div id='column1'>
                        <Bio user={user}/>
                        {/* <Courses courses={_courses}/> */}
                    </div>
                    <div id='column2'>
                        <Courses user={user}/>
                    </div>
                    <div id='column3'>
                        <Stats user={user}/>
                    </div>
                    
                </div>
                <div className="groups-content-container">
                        <Groups groups={user.postings} user={user}/>
                        <LeadGroups groups={user.postings}/>
                </div>
                {user.isAdmin ? <div className="reported-content-container">
                                <ReportedUsers resportedUsers={user.postings}/>
                                <ReportedGroups reportedGroups={user.postings}/>
                            </div>           
                : null}
        </div>
    )
}

export default Profile