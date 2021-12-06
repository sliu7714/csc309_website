// note:  this is the posting *view* not posting component
import {useParams} from "react-router";
import {useState, useEffect} from 'react';
import PostingCard from "../../components/PostingCard/PostingCard";
import "./styles.css"

import {postings} from "../../data/data"; // TEMP

const PostingDetailed = ({userID, isUserLoggedIn}) =>{

    // id of the post to display
    const{id} = useParams()

    const [posting, setPosting] = useState({})
    const [foundPost, setFoundPost] = useState(false)

    const [isMember, setIsMember] = useState(false)
    const [isCreator, setIsCreator] = useState(false)


    const getPosting = () =>{
        // TODO: fetch from backend
        // note: make sure all the returned attribute names match - ex "creatorInfo vs "creator"
        // fetch(`/api/posting/${id}`)
        //     .then((res) =>{
        //         if (!res.ok){
        //             // handle non-200 response code
        //             console.log(`Could not get posting ${id}, response code: ${res.status}`)
        //             return;
        //         }
        //         return res.json()
        //     })
        //     .then((data) =>{
        //         setPosting(data)
        //         setFoundPost(true)
        //     })
        //     .catch(err=>{
        //         console.log(`Error getting posting ${id}`)
        //     })

        // TEMP
        // note: careful wiht
        const tempPost = postings.filter(post => post.id.toString() == id.toString())
        if (tempPost.length < 1){
            return; // post not found

        }
        else{
            setPosting(tempPost[0])
            setFoundPost(true)

        }
    }

    useEffect(() => {
        // first call to get inital info about posting from backend
        getPosting()

    }, [])

    // checks if current user is a member or owner every time the posting is changed
    useEffect(() =>{
        try{
            // check if user is logged in
            if (isUserLoggedIn){
                if(posting.creatorInfo && posting.creatorInfo.id == userID){
                    setIsCreator(true)
                }

                if(posting.membersInfo && posting.membersInfo.filter(user => user.id == userID).length > 0){
                    setIsMember(true)
                }
            }
        }
        catch (err){
            console.log(err)
        }

    }, [posting])


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
                    userID={userID}
                    isCreator={isCreator}
                    isMember={isMember} />
            </div>

        </div>
    )
}


export default PostingDetailed