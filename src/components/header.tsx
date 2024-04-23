"use client"

import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";

const Header=()=>{
    const session=useSession();
    return(
        <header>
            <div className="py-4 px-6 w-full flex justify-between items-center border">
                {session.data?(
                    <div className="flex justify-between items-center w-[40%] border">
                        <h4>Hi, {session.data.user?.name}</h4>
                        <Button onClick={()=>signOut()}>Sign Out</Button>
                    </div>
                    
                ):<Button onClick={()=>signIn("google")}>Log In</Button>}
                <ModeToggle/>
            </div>
        </header>
    )
}

export default Header;