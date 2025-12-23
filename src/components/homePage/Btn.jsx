function Btn(props){
    return(
        <button className={`w-[150px] h-[35px] ${props.text} rounded-3xl ${props.bg} ${props.border} 
        md:w-[200px] md:h-[45px] ${props.hover} ${props.hovert} transition`}>{props.name}</button>
    )
}

export default Btn;