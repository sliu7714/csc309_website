import Header from "../components/Header/Header";
import {postings} from "../data/data"
import Components from "../components/Posting/PostingCreate";
import "./Home.css"


const Home = () => {

    return(
        <div>
            <Header></Header>
            <div className = "mainSearchContainer">
                {/*Replace with tag add function*/}
                <input className = "searchBar" placeholder = "Placeholder Tag Search"></input>
            </div>
            <div className = "gridBox">
            {postings.map(block => Components(block))}
            </div>
        </div>
    )


}

export default Home