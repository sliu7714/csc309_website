import "./Home.css"
import SearchTag from "../../components/SearchTag/SearchTag";
import React, { useState, useEffect } from 'react';
import PostingCard from "../../components/PostingCard/PostingCard";
import {SearchPostings} from "../../actions/postings";
import {useParams} from "react-router";

const Home = ({isAdmin }) => {
    const {tag} = useParams()
    const [postings, setPostings] = useState([]);

    // call this function everytime a postingCard needs to be updated
    const search = (tags) => {
        SearchPostings(tags, setPostings)
    }

    // fetch once initially
    useEffect(() =>{
        search(tag ? [tag]: [])
    }, [tag])



    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag search={search} initialTags={tag ? [tag]: []}></SearchTag>
            </div>
            <div className = "gridBox">

            {postings.map(posting =>
                <PostingCard
                    posting={posting}
                    updatePostings={search} // the update postings must be search to not lose search results
                    isCreator={posting.isCreator}
                    isMember={posting.isMember}
                    isAdmin={isAdmin}
                    isFilled={posting.isFilled}
                />
            )}
            </div>
        </div>
    )


}

export default Home