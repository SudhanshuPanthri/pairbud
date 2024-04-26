import { getRoom } from "@/data-access/rooms";
import { CodeSquare, GithubIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { PairBudVideo } from "./video-player";

const RoomPage=async (props:{params:{roomId:string}})=>{
    const roomId=props.params.roomId;
    const room=await getRoom(roomId);

    if(!room){
        return(
            <div className="h-screen w-full flex items-center justify-center">
                <h2>Room with this ID does not exist.</h2>
            </div>
        )
    }

    const languages=room.language.split(",").map((lang)=>lang.trim());

    return(
        <div className="px-6 py-4 lg:flex lg:gap-4">
            {/* left  */}
            <div className="flex w-full lg:w-2/3 ">
                {/* <h2>Video Player</h2> */}
                <PairBudVideo room={room} />
            </div>
            {/* right  */}
            <div className="flex flex-col w-full lg:w-1/3 gap-6 p-2 rounded-xl my-10 lg:my-0">
                <div className="flex items-center justify-start gap-2">
                    <CodeSquare />
                    <h1 className="text-2xl">{room?.name}</h1>
                </div>
                <h2 className="text-gray-600">{room?.description}</h2>
                <h2>Tags</h2>
                <div className="flex gap-4 flex-wrap">
                {languages.map((lang)=>(
                    <Badge key={lang} className="w-fit">{lang}</Badge>
                ))}
                </div>
                {room?.githubRepo && <Link href={room?.githubRepo!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-2">
                <GithubIcon />
                Github Repository
            </Link>}
            </div>
        </div>
    )
}

export default RoomPage;