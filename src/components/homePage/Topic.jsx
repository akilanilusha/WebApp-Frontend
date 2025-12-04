function Topic(props){
    return(
        <div className={`flex flex-col justify-center items-center ${props.margin}`}>
            <div className="text-accent text-xl md:text-2xl">{props.topic}</div>
            <div className="text-accent text-3xl md:text-5xl ">{props.subtopic}</div>
        </div>
    )
}

export default Topic;