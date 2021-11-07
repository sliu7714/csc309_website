import {postings} from "../data/data"
import Components from "../components/Posting/PostingCreate";
import "./Home.css"
import SearchTag from "../components/SearchTag/SearchTag";


const Home = () => {

    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag ></SearchTag>
            </div>
            <div className = "gridBox">
            {postings.map(block => Components(block))}
            </div>
        </div>
    )


}

export default Home