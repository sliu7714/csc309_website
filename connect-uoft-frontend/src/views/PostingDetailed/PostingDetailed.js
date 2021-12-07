// note:  this is the posting *view* not posting component
import {useParams} from "react-router";
import {useState, useEffect} from 'react';
import PostingCard from "../../components/PostingCard/PostingCard";
import "./styles.css"
import {getPostByID} from "../../actions/postings";

const PostingDetailed = ({isAdmin}) =>{

    // id of the post to display
    const{id} = useParams()

    const [posting, setPosting] = useState({})
    const [foundPost, setFoundPost] = useState(false)

    const getPosting = () =>{
        // fetch post info from backend
        getPostByID(id, setPosting, setFoundPost)
    }

    useEffect(() => {
        // first call to get initial info about posting from backend
        getPosting()

    }, [])


    if (!foundPost){
        return(
            <div>
                <h1>Could not find post</h1>
            </div>
        )
    }

    return(
        <div className="posting-detailed-page">
            <div className="posting-card-container">
                <PostingCard
                    posting={posting}
                    updatePostings={getPosting} />
            </div>

        </div>
    )
}


export default PostingDetailed