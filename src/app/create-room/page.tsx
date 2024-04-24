import { Globe } from "@/components/ui/globe";
import CreateRoomForm from "./create-room-form";
import { GlobeWrapper } from "@/components/globe-wrapper";
// import countries from "@/data/globe.json"

const CreateRoom=()=>{
    return(
        <div className="px-6 py-4 flex w-full justify-center items-center">
            <div className="hidden lg:flex lg:w-2/3 md:mr-6">
                <GlobeWrapper />
            </div>
            <div className="w-full md:w-2/4 lg:w-2/5">
                <h2 className="font-semibold text-2xl mb-10 lg:hidden md:text-4xl">Create Room</h2>
                <CreateRoomForm />
            </div>
        </div>
    )
}

export default CreateRoom;