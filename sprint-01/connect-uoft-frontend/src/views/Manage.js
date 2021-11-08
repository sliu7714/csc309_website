import {postings} from "../data/data.js"
import Components from "../components/ManagePosting/ManagePostingCreate";
import "./Home.css"
import SearchTag from "../components/SearchTag/SearchTag";



const Manage = () => {

    //currently hardcoded to only filter so that user "0" is managing
    const filteredPostings = postings.filter(function (postings) {
        return postings.creator === 0 
      });

    return(
        <div>
            <div className = "mainSearchContainer">
                <SearchTag ></SearchTag>
            </div>
            <div className = "gridBox">
            {filteredPostings.map(block => Components(block))}
            </div>
        </div>
    )


}

export default Manage