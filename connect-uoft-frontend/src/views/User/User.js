// view for another user's profile: (not the current logged in user's profile
import {useParams} from "react-router";

const User = () => {
    const {id} = useParams()

    const [user, setUser] = useState({})
    const [foundUser, setFoundUser] = useState(false)

    const getUser = () =>{
        // fetch post info from backend
        getUserByID(id, setUser, setFoundUser) //api call fix params when pulled
    }

    useEffect(() => {
        // first call to get initial info about posting from backend
        getUser()

    }, [])

    if (!foundPost){
        return(
            <div>
                <h1>Could not find post</h1>
            </div>
        )
    }

    return(
        
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
    )
}

export default User

