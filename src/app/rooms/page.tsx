
import { Button } from "@/components/ui/button";
import { AppWindowMac, GithubIcon, Home, Plus, Trash } from "lucide-react";
import Link from "next/link";

import { getRooms } from "@/data-access/rooms";
import SearchBar from "@/components/search-bar";

import RoomCard from "@/components/RoomCard";
import { getSession } from "@/lib/auth";
import Image from "next/image";
  

const Rooms= async ({searchParams}:{searchParams:{search:string}})=>{
    const rooms=await getRooms(searchParams.search);
    const session=await getSession();
    const isLoggedIn=!!session?.user;

    return(
        <div className="flex px-6 py-4 flex-wrap">
            <div className="">
                <SearchBar />
            </div>
            <div className="h-[8vh] w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-2">
                    <AppWindowMac className="lg:h-12 lg:w-12 md:h-8 md:w-8" />
                    <h1 className="text-xl font-semibold lg:text-4xl md:text-3xl">All Rooms</h1>
                    
                </div>
                <div className="flex gap-4">
                {isLoggedIn && (
                    <Button className="flex items-center justify-center gap-4">
                        <Home />
                        <Link href="/your-rooms">Your Rooms</Link>
                    </Button>
                )}
                <Button asChild className="flex items-center justify-center">
                    <div>
                    <Plus />
                    <Link href="/create-room" className="hidden lg:block">Create Room</Link>
                    </div>
                </Button>
                </div>
            </div>

            {rooms.length===0 && (
                <div className="flex flex-col items-center justify-center w-full gap-10">
                    <Image src="./placeholder.svg" width={400} height={400} alt="placeholder" />
                    <h1 className="text-2xl">No Rooms Found</h1>
                </div>
            )}

            {rooms?.map((room)=>{
                return <RoomCard key={room.id} room={room} />
            })}
        </div>
    )
}

export default Rooms;