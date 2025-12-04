
function Links(props){
    return(
        
        <div className="m-5">
                <div className="text-2xl text-accent">{props.header}</div>
                <div className="flex flex-row mt-5">
                    <div className="w-fit h-fit text-2xl"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                    <div className="text-[16px] ml-3">{props.link1}</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-fit h-fit text-2xl"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                    <div className="text-[16px] ml-3">{props.link2}</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-fit h-fit text-2xl"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                    <div className="text-[16px] ml-3">{props.link3}</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-fit h-fit text-2xl"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                    <div className="text-[16px] ml-3">{props.link4}</div>
                </div>
                <div className="flex flex-row">
                    <div className="w-fit h-fit text-2xl"><ion-icon name="chevron-forward-outline"></ion-icon></div>
                    <div className="text-[16px] ml-3">{props.link5}</div>
                </div>
                
        </div>




    )
}

export default Links