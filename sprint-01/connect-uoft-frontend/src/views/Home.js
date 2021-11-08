import {postings} from "../data/data"
import Components from "../components/Posting/PostingCreate";
import "./Home.css"
import SearchTag from "../components/SearchTag/SearchTag";
import {useState, useEffect} from 'react'


const Home = ({posts}) => {

    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag ></SearchTag>
            </div>
            <div className = "gridBox">
            {posts.map(block => Components(block))}
            </div>
        </div>
    )


}

export default Home