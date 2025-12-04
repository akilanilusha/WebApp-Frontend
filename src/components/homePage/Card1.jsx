import hero from '../../assets/homepage/hero.jpg'

function Card1(props){
return(
    <div className={`w-[275px] h-[350px] bg-primary rounded-3xl drop-shadow-xl bg-cover 
        bg-center bg-no-repeat ${props.hid} ${props.blo} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 `} style={{backgroundImage: `url(${hero})` }}></div>
)}

export default Card1

