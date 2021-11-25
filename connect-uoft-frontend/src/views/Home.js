import {postings as p} from "../data/data"
import CreatePosting from "../components/Posting/PostingCreate";
import "./Home.css"
import SearchTag from "../components/SearchTag/SearchTag";
import { users } from "../data/data";
import React, { useState, useEffect } from 'react';


const isAdmin = (userID) => {
    users.forEach(obj => {if (obj.id === userID) {return obj.isAdmin}})
}

const Home = ({userID}) => {

    //const [data, setData] = useState(postings); {/*Data should be fetched from server and saved in the useState*/}
    const [postings, setPosting] = useState([]);
      
    useEffect(() => {
            setPosting(p)
    }, []);

    const search = () => {
        alert('Not implemented fdskjfdjk')
    }

    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag search={search}></SearchTag>
            </div>
            <div className = "gridBox">
            {postings.map(block => CreatePosting(block, isAdmin(userID)))} {/*Change to data useState when fetching from server*/}
            </div>
        </div>
    )


}

export default Home