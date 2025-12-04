import Btn from "./Btn";
import Topic from "./topic";

function Newsletter(){
    return(
         
                    <section className="w-full h-[200px] bg-primary">
                        <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-full place-items-center justify-items-center">
                            <div className="w-fit h-fit">
                                <Topic topic="This is our" subtopic="Latest Newslatter"/>
                            </div>
                            <div className="flex flex-row w-fit h-fit gap-10">
                                <Btn name="Subscribe Now" bg="bg-accent"/>
                                <Btn name="Subscribe Now" bg="bg-accent"/>
                            </div>
                        </div>
        
                       
                    </section>
    )
}

export default Newsletter