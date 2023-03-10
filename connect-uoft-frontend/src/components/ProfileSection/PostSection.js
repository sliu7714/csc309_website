

const PostSection = ({post}) =>{
    return(
        <div className="group-content-container post-section-card">
            <a  className="title-link" href={`/posting/${post._id}`} target="_blank" rel="noreferrer">
                <h3 className="group-content-container__h3">{post.title}</h3>
            </a>
            <hr/>
            <div className="small-br"/>
            <a  className="creator-name-link" href={`/user/${post.creatorID}`} target="_blank" rel="noreferrer">
                <div className=""> Creator: {post.creatorInfo ? post.creatorInfo.name : "no-name"}</div>
            </a>
            <div className="description">{post.description ? post.description : "no description"}</div>
            {/*<div className="group-content-container-meeting">*/}
            {/*    <p className="text"> Link: </p>*/}
            {/*    <a className="group-content-container-link" href="/profile">Link to meeting through discord</a>*/}
            {/*</div>*/}
            <div className="group-member-list">
                {post.memberInfo  && post.memberInfo.length > 0?
                    <div>
                        <h3 className="group-content-container__h3 ">Members</h3>
                        {post.memberInfo.map(member =>
                            <div className="group-member-list-member" title={member.name}>
                                <a  className="member-name-link" href={`/user/${member.id}`} target="_blank" rel="noreferrer">
                                    {member.name}
                                </a>
                            </div>
                        )}
                    </div>
                    :
                    <i className="grey-text">no members</i>
                }
            </div>
        </div>
    )
}

export default PostSection