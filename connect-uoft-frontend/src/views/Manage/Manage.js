import PostingCard from "../../components/PostingCard/PostingCard";
import {useState, useEffect} from 'react'
import "./style.css"
import {getUserCreatedPostings} from "../../actions/postings";

const Manage = ({}) => {

    const [userPostings, setUserPostings] = useState([])

    // call this function everytime a post needs to be updated
    const fetchPostings = () =>{
        getUserCreatedPostings(setUserPostings)

        // TEMPORARY
        // setUserPostings(postings.filter((postings) => postings.creatorInfo.id === 1))
    }

    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [])


    return(
        <div >
            <div className="manage-section">
            {userPostings.map(posting =>
                <PostingCard
                    posting={posting}
                    updatePostings={fetchPostings}
                    isCreator={true}
                />
                )}
            </div>
        </div>
    )


}

export default Manage