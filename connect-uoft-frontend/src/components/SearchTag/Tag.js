import "./styles.css"

const Tag = ({text}) =>{

    return(
        <div className="tag_regular">
            <a href={`/home/search/${text}`}
               target="_blank"
               rel="noreferrer"
            >
                {text}
            </a>
        </div>
    )
}

export default Tag