import {postings} from "../../data/data" // TEMP
import ManagePostingCard from "../../components/ManagePostingCard/ManagePostingCard";
import {useState, useEffect} from 'react'
import "./style.css"



const Manage = () => {

    const [userPostings, setUserPostings] = useState([])


    // fetch once initially
    useEffect(() =>{
        fetchPostings()
    }, [])

    // call this function everytime a post needs to be updated
    const fetchPostings = () =>{
        // TODO: add backend request here:
        // fetch('/user/postings')
        //     .then(res => res.json())
        //     .then(data => setUserPostings(postings))
        //     .catch(err =>{
        //         // deal with error here
        //         console.log(err)
        //         return;
        //     })

        // TEMPORARY
        setUserPostings(postings.filter((postings) => postings.creatorInfo.id === 1))
    }




    return(
        <div>
            <div className="manage">
            {userPostings.map(posting => <ManagePostingCard posting={posting} updatePostings={fetchPostings}/>)}
            </div>
        </div>
    )


}

export default Manage