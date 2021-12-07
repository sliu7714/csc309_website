// view for another user's profile: (not the current logged in user's profile
import {useParams} from "react-router";
import {useState, useEffect, useCallback} from "react";
import Bio from "../../components/ProfileSection/Bio";
import Courses from "../../components/ProfileSection/Courses";
import Stats from "../../components/ProfileSection/Stats";
import {getProfileInfoNotSignedIn} from "../../actions/user";
import OtherUserInfo from "../../components/ProfileSection/OtherUserInfo";

const User = () => {
    const {id} = useParams()

    const [user, setUser] = useState({})
    const [foundUser, setFoundUser] = useState(false)

    const getUser = useCallback(()=>{
        // fetch post info from backend
        getProfileInfoNotSignedIn(id, setUser, setFoundUser) //api call fix params when pulled
    }, [id, setUser, setFoundUser])

    useEffect(() => {
        // first call to get initial info about posting from backend
        getUser()

    }, [getUser])

    if (!foundUser){
        return(
            <div>
                <h1>Could not find user</h1>
            </div>
        )
    }

    return(
        
        <div className="no-group-container">
            <OtherUserInfo user={user}/>
            <Bio user={user} isNotCurrentUser={true}/>
            <Courses user={user} isNotCurrentUser={true}/>
                    
        </div>
    )
}

export default User

