import Header from "../components/Header/Header";
import postings from "../data/postings.json"
import Components from "../components/ManagePosting/ManagePostingCreate";
import "./Home.css"




const Manage = () => {

    //currently hardcoded to only filter so that user "0" is managing
    const filteredPostings = postings.filter(function (postings) {
        return postings.members.includes(0, 0) 
      });

    return(
        <div>
            <Header></Header>
            <div className = "mainSearchContainer">
                {/*Replace with tag add function*/}
                <input className = "searchBar" placeholder = "Placeholder Tag Search"></input>
            </div>
            <div className = "gridBox">
            {filteredPostings.map(block => Components(block))}
            </div>
        </div>
    )


}

export default Manage