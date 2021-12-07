import { useState, useEffect} from "react";
import './styles.css'
import {getProfileInfo, getReportedUsers} from "../../actions/user";
import Bio from "../../components/ProfileSection/Bio";
import UserHandle from "../../components/ProfileSection/UserHandle";
import Courses  from "../../components/ProfileSection/Courses";
import Groups from "../../components/ProfileSection/Groups";
import ReportedGroups from "../../components/ProfileSection/ReportedGroups";
import ReportedUsers from "../../components/ProfileSection/ReportedUsers";
import Stats from "../../components/ProfileSection/Stats";
import {getReportedPost, getUserCreatedPostings, getUserMemberPostings} from "../../actions/postings";



const Profile = ({isAdmin, callLogout}) => {
    const [user, setUser] = useState()
    const [userCreatedPosts, setUserCreatedPosts] = useState([])
    const [userMemberPostings, setUserMemberPostings] = useState([])

    // only for admin users, will just stay as empty lists for regular users
    const [reportedPostings, setReportedPostings] = useState([])
    const [reportedUsers, setReportedUsers] = useState([])

    // fetch posts once initially
    useEffect(() =>{
        getUserCreatedPostings(setUserCreatedPosts)
        getUserMemberPostings(setUserMemberPostings)
        if(isAdmin){
            getReportedPost(setReportedPostings)
            getReportedUsers(setReportedUsers)
        }
        getProfileInfo(setUser)
    }, [isAdmin])

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
                    <UserHandle user={user}/>
                </div>
                <div className="no-group-container">
                    <div id='column1'>
                        <Bio user={user}/>
                    </div>
                    <div id='column2'>
                        <Courses user={user}/>
                    </div>
                    <div id='column3'>
                        <Stats numCourses={user.courses ? user.courses.length: 0}
                               numGroupsMade={userCreatedPosts.length}
                               numMemberships={userMemberPostings.length}/>
                    </div>
                    
                </div>
                <div className="groups-content-container">
                        <Groups
                            postings={userCreatedPosts}
                            title="Created Groups"
                            noPostsMessage="You have not created any groups"
                        />
                        <Groups
                            postings={userMemberPostings}
                            title="My Groups"
                            subtitle="groups you are a member of"
                            noPostsMessage="You Have Not Joined Any Groups"
                        />
                </div>
                { isAdmin ?
                    <div className="reported-content-container">
                        <ReportedUsers users={reportedUsers} />
                        <ReportedGroups reportedPostings={reportedPostings}/>
                    </div>
                    :
                    null
                }
        </div>
    )
}

export default Profile