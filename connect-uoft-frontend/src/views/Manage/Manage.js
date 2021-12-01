import {postings} from "../../data/data" // TEMP
import PostingCard from "../../components/PostingCard/PostingCard";
import {useState, useEffect} from 'react'
import "./style.css"

const Manage = ({userID}) => {

    const [userPostings, setUserPostings] = useState([])

    // call this function everytime a post needs to be updated
    const fetchPostings = () =>{
        // TODO: add backend request here:
        // fetch('/user/postings')
        //     .then(res => res.json())
        //     .then(data => setUserPostings(postings))
        //     .catch(err =>{
        //         // deal with error here
        //         console.log(err)
        //         return;
        //     })

        // TEMPORARY
        setUserPostings(postings.filter((postings) => postings.creatorInfo.id === 1))
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
                    userID={userID}
                    isCreator={true}
                />
                )}
            </div>
        </div>
    )


}

export default Manage