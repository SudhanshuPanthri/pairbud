import { Button } from "@/components/ui/button";
import { AppWindowMac, GithubIcon, Home, Trash } from "lucide-react";
import Link from "next/link";
import { getUserRooms } from "@/data-access/rooms";

import RoomCard from "@/components/RoomCard";
  



const YourRooms= async ()=>{
    const rooms=await getUserRooms();

    return(
        <div className="flex px-6 py-4 flex-wrap">
            <div className="h-[8vh] w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <AppWindowMac className="lg:h-12 lg:w-12 md:h-8 md:w-8" />
                    <h1 className="text-xl font-semibold lg:text-4xl md:text-3xl">Your Rooms</h1>
                </div>
                <div className="flex gap-4">
                <Button className="flex items-center justify-center gap-4">
                    <Home />
                    <Link href="/rooms">All Room</Link>
                </Button>
                <Button asChild>
                    <Link href="/create-room">Create Room</Link>
                </Button>
                </div>
            </div>
            {rooms?.map((room)=>{
                return <RoomCard key={room.id} room={room} />
            })}
        </div>
    )
}

export default YourRooms;