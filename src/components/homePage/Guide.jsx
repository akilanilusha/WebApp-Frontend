function Guide(props) {
    return (
        <div className="w-fit h-fit flex justify-center items-center relative">
            <div className="w-[175px] h-[175px] absolute bg-green-300 z-8 rounded-[50%] top-0 left-15 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${props.img})` }}></div>
            <div className="w-[300px] h-[250px] bg-primary rounded-2xl flex flex-col justify-center items-center mt-25">
                
                <div className="w-[278px] h-fit bg-ternary flex flex-col justify-start items-center mt-15 rounded-2xl">
                    <div className="w-fit text-2xl mt-5 ">{props.name}</div>
                    <div className="">Tour Guide</div>
                    <div className="w-fit flex flex-row mt-5  gap-5 mb-5">
                        <div className="w-fit h-fit text-3xl gap-5"><ion-icon name="logo-facebook"></ion-icon></div>
                        <div className="w-fit h-fit text-3xl gap-5"><ion-icon name="logo-instagram"></ion-icon></div>
                        <div className="w-fit h-fit text-3xl gap-5"><ion-icon name="logo-twitter"></ion-icon></div>
                        <div className="w-fit h-fit text-3xl gap-5"><ion-icon name="logo-linkedin"></ion-icon></div>
                       
                    </div>
                </div>
                {/* <div className="w-[278px] h-[40px] bg-purple-500 mt-5"></div> */}
            </div>
        </div>
    ); 
}

export default Guide;