import PostingCard from "../../components/PostingCard/PostingCard";
import {useState, useEffect} from 'react'
import "./style.css"
import {getReportedPost, getUserCreatedPostings, getUserMemberPostings} from "../../actions/postings";

const Manage = ({isAdmin}) => {

    const [userCreatedPostings, setUserCreatedPostings] = useState([])
    const [userMemberPostings, setUserMemberPostings] = useState([])

    // only for admin users, will just stay as empty lists for regular users
    const [reportedPostings, setReportedPostings] = useState([])

    // call this function everytime a post needs to be updated
    const fetchPostings = () =>{
        getUserCreatedPostings(setUserCreatedPostings)

        getUserMemberPostings(setUserMemberPostings)

        if(isAdmin){
            getReportedPost(setReportedPostings)
        }
    }

    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [isAdmin])


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
                                isFilled={false} //isFilled does not matter in manage screen
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
                                isFilled={false} //isFilled does not matter in manage screen
                            />)
                        :
                        <h2 className="grey-text"><i>no groups</i></h2>
                    }
                </div>
            </div>

            {
                isAdmin ?
                    <div>
                        <h1 className="manage-page-title">Reported posts</h1>
                        <div className="manage-posts-grid">
                            {reportedPostings &&  reportedPostings.length > 0?
                                reportedPostings.map(posting =>
                                    <PostingCard
                                        key={posting._id}
                                        posting={posting}
                                        updatePostings={fetchPostings}
                                        isAdmin={isAdmin}
                                        showUnreport={true}
                                    />)
                                :
                                <h2 className="grey-text"><i>no groups</i></h2>
                            }
                        </div>
                    </div>
                    :
                    null
            }
        </div>
    )


}

export default Manage