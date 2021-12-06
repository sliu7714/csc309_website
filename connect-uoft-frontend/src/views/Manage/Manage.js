import PostingCard from "../../components/PostingCard/PostingCard";
import {useState, useEffect} from 'react'
import "./style.css"
import {getUserCreatedPostings, getUserMemberPostings} from "../../actions/postings";

const Manage = ({}) => {

    const [userCreatedPostings, setUserCreatedPostings] = useState([])

    const [userMemberPostings, setUserMemberPostings] = useState([])

    // call this function everytime a post needs to be updated
    const fetchPostings = () =>{
        getUserCreatedPostings(setUserCreatedPostings)

        // TODO: set userMember posts from backend
        getUserMemberPostings(setUserMemberPostings)
    }

    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [])


    return(
        <div >
            <div>
                <h1 className="manage-page-title">Groups you created</h1>
                <div className="manage-posts-grid">
                    {userCreatedPostings && userCreatedPostings.length > 0?
                        userCreatedPostings.map(posting =>
                            <PostingCard
                                key={posting._id}
                                posting={posting}
                                updatePostings={fetchPostings}
                                isCreator={true}
                            />)
                        :
                            <h2 className="grey-text"><i>no groups</i></h2>
                    }
                </div>
            </div>


            <div>
                <h1 className="manage-page-title">Groups you are a member of</h1>
                <div className="manage-posts-grid">
                    {userMemberPostings &&  userMemberPostings.length > 0?
                        userMemberPostings.map(posting =>
                            <PostingCard
                                key={posting._id}
                                posting={posting}
                                updatePostings={fetchPostings}
                                isMember={true}
                            />)
                        :
                        <h2 className="grey-text"><i>no groups</i></h2>
                    }
                </div>
            </div>
        </div>
    )


}

export default Manage