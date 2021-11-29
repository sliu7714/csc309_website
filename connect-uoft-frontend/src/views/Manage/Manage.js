import {postings} from "../../data/data" // TEMP
import ManagePostingCard from "../../components/ManagePostingCard/ManagePostingCard";
import {useState, useEffect} from 'react'
import "./style.css"
import Popup from "../../components/Popup/Popup";



const Manage = () => {

    const [userPostings, setUserPostings] = useState([])

    const [showEditProfile, setShowEditProfile] = useState(false)
    const [postingToEdit, setPostingToEdit] = useState({})


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
        <div >
            <div className="manage">
            {userPostings.map(posting =>
                <ManagePostingCard
                    posting={posting}
                    updatePostings={fetchPostings}
                    setShowEditProfile={setShowEditProfile}
                    setPostingToEdit={setPostingToEdit}
                />
                )}
            </div>
            <Popup trigger={showEditProfile}
                   setTrigger={setShowEditProfile}
                   isEditing={true}
                   posting={postingToEdit}/>
        </div>
    )


}

export default Manage