"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Code, Delete, LogOut, LogOutIcon } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
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
import { deleteAccountAction } from "@/actions";

const Header=()=>{
    const session=useSession();
    return(
        <header>
            <div className="flex w-full h-[10vh] px-6 py-4">
                <div className="w-1/3 h-full flex items-center justify-start gap-2">
                    <Code />
                    <Link href='/'>
                        <h2 className="font-semibold text-xl">PairBud.io</h2>
                    </Link>
                </div>
                <div className="w-2/3 h-full">
                    <div className="flex justify-end items-center gap-4">
                        {session.data?.user ? (
                            <>
                                <h4 className="hidden lg:block md:block">Hi, {session.data.user.name!}</h4>
                                <Avatar>
                                    <AvatarImage src={session.data.user.image ?? ""} />
                                    <AvatarFallback>{session.data.user.name?.slice(0,1)}</AvatarFallback>
                                </Avatar>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild >
                                    <Button className="gap-2">
                                        <Delete />
                                        <span className="hidden lg:block">Delete Account</span>
                                    </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your rooms
                                            and remove your data from our servers.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={async()=>{
                                            await deleteAccountAction();
                                            signOut({callbackUrl:"/"})
                                        }}>Yes, Delete Account</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                    </AlertDialog>
                                <Button onClick={()=>signOut({callbackUrl:"/"})} className="gap-2">
                                    <LogOutIcon />
                                    <span className="hidden lg:block">Sign Out</span>
                                </Button>
                            </>
                        ):(
                            <Button onClick={()=>signIn("google")}>
                                Log In
                            </Button>
                        )}
                        <ModeToggle />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;