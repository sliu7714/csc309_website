// view for another user's profile: (not the current logged in user's profile
import {useParams} from "react-router";

const User = () => {
    const {id} = useParams()

    return(
        <div>
            temp placeholder for other user's profile
            userid: {id}
        </div>
    )
}

export default User

