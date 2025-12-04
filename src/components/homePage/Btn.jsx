function Btn(props){
    return(
        <button className={`w-[150px] h-[35px] text-primary rounded-3xl ${props.bg} ${props.border} md:w-[200px] md:h-[45px]`}>{props.name}</button>
    )
}

export default Btn;