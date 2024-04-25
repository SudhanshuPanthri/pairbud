
import { Button } from "@/components/ui/button";
import { AppWindowMac, GithubIcon } from "lucide-react";
import Link from "next/link";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Room } from "@/db/schema";
import { getRooms } from "@/data-access/rooms";
import SearchBar from "@/components/search-bar";
  


function RoomCard({room}:{room:Room}){
    return(
    <Card className="lg:w-1/4 md:w-2/5  mt-10 w-full mx-2 flex flex-col ">
        <CardHeader>
            <CardTitle>{room.name}</CardTitle>
            <CardDescription>{room.description}</CardDescription>
        </CardHeader>
        <CardContent>
            {room.githubRepo && <Link href={room.githubRepo!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-2">
                <GithubIcon />
                Github Repository
            </Link>}
        </CardContent>
        <CardFooter>
            <Button asChild>
                <Link href={`/room/${room.id}`}>Join Room</Link>
            </Button>
        </CardFooter>
    </Card>
    )
}


const Rooms= async ({searchParams}:{searchParams:{search:string}})=>{
    const rooms=await getRooms(searchParams.search);

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
                <Button asChild>
                    <Link href="/create-room">Create Room</Link>
                </Button>
            </div>
            {rooms?.map((room)=>{
                return <RoomCard key={room.id} room={room} />
            })}
        </div>
    )
}

export default Rooms;