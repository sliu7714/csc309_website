import {postings as p} from "../../data/data";
import "./Home.css"
import SearchTag from "../../components/SearchTag/SearchTag";
import React, { useState, useEffect } from 'react';
import PostingCard from "../../components/PostingCard/PostingCard";

const Home = ({isAdmin }) => {
    const [postings, setPostings] = useState([]);

    // fetch all posts initially
    const fetchPostings = () =>{
        // TODO: add backend request here:, only fetch
        // TEMPORARY
        setPostings(p)
    }

    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [])

    // call this function everytime a postingCard needs to be updated
    const search = () => {
        // TODO connect to backend to fetch posts based on search results
        alert('Not implemented fdskjfdjk')
    }

    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag search={search}></SearchTag>
            </div>
            <div className = "gridBox">

            {postings.map(posting =>
                <PostingCard
                    posting={posting}
                    updatePostings={search} // the update postings must be search to not lose search results
                    isCreator={posting.isCreator}
                    isMember={posting.isMember}
                    isAdmin={isAdmin}
                />
            )}
            </div>
        </div>
    )


}

export default Home