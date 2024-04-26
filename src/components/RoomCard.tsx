"use client"

import { Button } from "@/components/ui/button";
import { AppWindowMac, GithubIcon, Home, Trash } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { deleteRoomAction } from "@/app/your-rooms/actions";


function RoomCard({room}:{room:Room}){

    const handleDelete=()=>{
        deleteRoomAction(room.id);
    }

    const languages=room.language.split(",").map((lang)=>lang.trim());
    return(
    <Card className="lg:w-1/4 md:w-2/5  mt-10 w-full mx-2 flex flex-col ">
        <div className="flex items-center justify-between">
            <div>
                <CardHeader>
                    <CardTitle>{room.name}</CardTitle>
                    <CardDescription>{room.description}</CardDescription>
                </CardHeader>
            </div>
            <AlertDialog>
            <AlertDialogTrigger asChild >
            <Button className="mr-2" variant="destructive">
                <Trash className="w-4 h-4"/>
            </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your room
                    and remove your data from our servers.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
            </AlertDialog>
        </div>
        <CardContent>
            {room.githubRepo && <Link href={room.githubRepo!} target="_blank" rel="noopener noreferrer" className="flex items-center justify-start gap-2">
                <GithubIcon />
                Github Repository
            </Link>}
            <div className="flex gap-4 flex-wrap mt-4">
                {languages.map((lang)=>(
                    <Badge key={lang} className="w-fit cursor-pointer">{lang}</Badge>
                ))}
                </div>
        </CardContent>
        <CardFooter>
            <Button asChild>
                <Link href={`/room/${room.id}`}>Join Room</Link>
            </Button>
        </CardFooter>
    </Card>
    )
}

export default RoomCard;