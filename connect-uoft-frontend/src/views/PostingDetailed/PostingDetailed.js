// note:  this is the posting *view* not posting component
import {useParams} from "react-router";
import {useState, useEffect} from 'react';
import PostingCard from "../../components/PostingCard/PostingCard";
import "./styles.css"
import {getPostByID} from "../../actions/postings"; // TEMP

const PostingDetailed = ({userID, isUserLoggedIn}) =>{

    // id of the post to display
    const{id} = useParams()

    const [posting, setPosting] = useState({})
    const [foundPost, setFoundPost] = useState(false)

    // const [isMember, setIsMember] = useState(false)
    // const [isCreator, setIsCreator] = useState(false)


    const getPosting = () =>{
        // fetch post info from backend
        getPostByID(id, setPosting, setFoundPost)
    }

    useEffect(() => {
        // first call to get initial info about posting from backend
        getPosting()

    }, [])

    // // checks if current user is a member or owner every time the posting is changed
    // useEffect(() =>{
    //     try{
    //         // check if user is logged in
    //         if (isUserLoggedIn){
    //             if(posting.creatorInfo && posting.creatorInfo.id == userID){
    //                 setIsCreator(true)
    //             }
    //
    //             if(posting.membersInfo && posting.membersInfo.filter(user => user.id == userID).length > 0){
    //                 setIsMember(true)
    //             }
    //         }
    //     }
    //     catch (err){
    //         console.log(err)
    //     }
    //
    // }, [posting])


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
                    updatePostings={getPosting}
                    isCreator={posting.isCreator}
                    isMember={posting.isMember} />
            </div>

        </div>
    )
}


export default PostingDetailed