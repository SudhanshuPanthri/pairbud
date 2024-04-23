import { Globe } from "@/components/ui/globe";
import CreateRoomForm from "./create-room-form";
import { GlobeWrapper } from "@/components/globe-wrapper";
// import countries from "@/data/globe.json"

const CreateRoom=()=>{
    return(
        <div className="px-6 py-4">
            <GlobeWrapper />
            <CreateRoomForm />
        </div>
    )
}

export default CreateRoom;