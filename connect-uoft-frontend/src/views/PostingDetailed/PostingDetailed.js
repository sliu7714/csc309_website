// note:  this is the posting *view* not posting component
import {useParams} from "react-router";

const PostingDetailed = () =>{

    const{id} = useParams()

    return(
        <div>
            posting placeholder:
            posting id : {id}

        </div>
    )
}


export default PostingDetailed