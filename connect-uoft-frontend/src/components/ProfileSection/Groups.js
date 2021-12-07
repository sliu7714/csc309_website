import "./styles.css"
import PostSection from "./PostSection";


const Groups = ({postings, title, noPostsMessage}) => {

    return (
        <div className='group-content profile-container profile-card-background'>
            <h1 className="section_title">{title}</h1>
            <div id="joined-groups" className="groups-list">         
               {postings && postings.length > 0 ?
                   postings.map(post =>
                       <div className="group">
                           <PostSection post={post}/>
                        </div>)
                   :
                   <div>{noPostsMessage}</div>
               }
            </div>
        </div>
    )
}

export default Groups

