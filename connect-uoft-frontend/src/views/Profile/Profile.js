import { useState, useEffect} from "react";
import './styles.css'
import {getProfileInfo} from "../../actions/user";
// import { users } from "../../data/data";
import { getUserMemberPostings } from "../../actions/postings";
import Bio from "../../components/ProfileSection/Bio";
import UserHandle from "../../components/ProfileSection/UserHandle";
import Courses  from "../../components/ProfileSection/Courses";
import {Groups, LeadGroups} from "../../components/ProfileSection/Groups";
import ReportedGroups from "../../components/ProfileSection/ReportedGroups";
import ReportedUsers from "../../components/ProfileSection/ReportedUsers";
import Stats from "../../components/ProfileSection/Stats";

const _profilePictures = ["/images/profile-pictures/smiley.svg", "/images/profile-pictures/chef.svg", "/images/profile-pictures/fish.svg"]


const Profile = ({isAdmin, callLogout}) => {
    const [user, setUser] = useState()
    const [postings, setPostings] = useState([])

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
                <div id='logout-btn-container'>
                    <button className='logout-btn' onClick={callLogout}>Logout</button>
                </div>
                <div className="user-container">
                    <UserHandle profilePictures={_profilePictures} user={user}/>
                </div>
                <div className="no-group-container">
                    <div id='column1'>
                        <Bio user={user}/>
                    </div>
                    <div id='column2'>
                        <Courses user={user}/>
                    </div>
                    <div id='column3'>
                        <Stats user={user}/>
                    </div>
                    
                </div>
                <div className="groups-content-container">
                        <Groups profilePictures={_profilePictures} user={user}/>
                        <LeadGroups profilePictures={_profilePictures}  user={user}/>
                </div>
                {user.isAdmin ? <div className="reported-content-container">
                                <ReportedUsers profilePictures={_profilePictures} />
                                <ReportedGroups profilePictures={_profilePictures}/>
                            </div>           
                : null}
        </div>
    )
}

export default Profile