import PostingCard from "../../components/PostingCard/PostingCard";
import {useState, useEffect, useCallback} from 'react'
import "./style.css"
import {
    getDeniedPosts,
    getPendingPosts,
    getReportedPost,
    getUserCreatedPostings,
    getUserMemberPostings
} from "../../actions/postings";

// constants for the tab types
const CREATED = 'Created'
const MEMBER = 'Member'
const PENDING = 'Pending'
const DENIED = 'Denied'
const REPORTED = 'Reported'

const Manage = ({isAdmin}) => {

    const [userCreatedPostings, setUserCreatedPostings] = useState([])
    const [userMemberPostings, setUserMemberPostings] = useState([])
    const [userPendingPostings, setUserPendingPostings] = useState([])
    const [userDeniedPostings, setUserDeniedPostings] = useState([])

    // only for admin users, will just stay as empty lists for regular users
    const [reportedPostings, setReportedPostings] = useState([])

    // call this function everytime a post needs to be updated
    const fetchPostings = useCallback( () =>{
        getUserCreatedPostings(setUserCreatedPostings)

        getUserMemberPostings(setUserMemberPostings)

        getPendingPosts(setUserPendingPostings)

        getDeniedPosts(setUserDeniedPostings)

        if(isAdmin){
            getReportedPost(setReportedPostings)
        }
    }, [isAdmin, setUserCreatedPostings, setUserMemberPostings, setUserPendingPostings, setUserDeniedPostings, setReportedPostings])

    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [isAdmin, fetchPostings])

    const [selectedTab, setSelectedTab] = useState(CREATED)


    return(

        <div className='manage-page-container'>
            <div className='tab-section'>
                <div
                    title={"tab to view groups you created"}
                    className={`tab ${selectedTab === CREATED ? 'selected' : null}`}
                    onClick={() => setSelectedTab(CREATED)}
                >
                    <div className="tab-title">Created</div>
                </div>
                <div
                    title={"tab to view groups you are a member of"}
                    className={`tab ${selectedTab === MEMBER ? 'selected' : null}`}
                    onClick={() => setSelectedTab(MEMBER)}
                >
                    <div className="tab-title">Member</div>
                </div>
                <div
                    title={"tab to view groups have a pending application for"}
                    className={`tab ${selectedTab === PENDING ? 'selected' : null}`}
                    onClick={() => setSelectedTab(PENDING)}
                >
                    <div className="tab-title">Pending</div>

                </div>
                <div
                    title={"tab to view groups have a denied application for"}
                    className={`tab ${selectedTab === DENIED ? 'selected' : null}`}
                    onClick={() => setSelectedTab(DENIED)}
                >
                    <div className="tab-title">Denied</div>
                </div>
                {
                    isAdmin ?
                        <div
                            title={"tab to view postings that are reported"}
                            className={`tab ${selectedTab === REPORTED ? 'selected' : null}`}
                            onClick={() => setSelectedTab(REPORTED)}
                        >
                            <div className="tab-title">Reported</div>
                        </div>
                        :
                        null
                }
            </div>

            <div className='manage-section-container'>

                {
                    selectedTab === CREATED ?
                        <div>
                            <h1 className="manage-subtitle"> Groups you created:</h1>
                            <div className="manage-posts-grid">
                                {userCreatedPostings && userCreatedPostings.length > 0 ?
                                    userCreatedPostings.map(posting =>
                                        <PostingCard
                                            key={posting._id}
                                            posting={posting}
                                            updatePostings={fetchPostings}
                                            // do not pass isAdmin - want edit button to show
                                        />)
                                    :
                                    <h2 className="grey-text"><i>no groups</i></h2>
                                }
                            </div>
                        </div>
                        :
                    selectedTab === MEMBER ?
                        <div>
                            <h1 className="manage-subtitle"> Groups you are a member of:</h1>
                            <div className="manage-posts-grid">
                                {userMemberPostings &&  userMemberPostings.length > 0?
                                    userMemberPostings.map(posting =>
                                        <PostingCard
                                            key={posting._id}
                                            posting={posting}
                                            updatePostings={fetchPostings}
                                            // do not pass isAdmin - want report button to show
                                        />)
                                    :
                                    <h2 className="grey-text"><i>no groups</i></h2>
                                }
                            </div>
                        </div>
                        :
                    selectedTab === PENDING ?
                        <div>
                            <h1 className="manage-subtitle"> Groups you created:</h1>
                            <div className="manage-posts-grid">
                                {userPendingPostings &&  userPendingPostings.length > 0?
                                    userPendingPostings.map(posting =>
                                        <PostingCard
                                            key={posting._id}
                                            posting={posting}
                                            updatePostings={fetchPostings}
                                            pending={true}
                                        />)
                                    :
                                    <h2 className="grey-text"><i>no groups</i></h2>
                                }
                            </div>
                        </div>
                        :
                    selectedTab === DENIED ?
                        <div className="manage-posts-grid">
                            {userDeniedPostings &&  userDeniedPostings.length > 0?
                                userDeniedPostings.map(posting =>
                                    <PostingCard
                                        key={posting._id}
                                        posting={posting}
                                        updatePostings={fetchPostings}
                                    />)
                                :
                                <h2 className="grey-text"><i>no groups</i></h2>
                            }
                        </div>
                        :
                    selectedTab === REPORTED && isAdmin ?
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
                        :
                        null
                }
            </div>

        </div>
    )


}

export default Manage