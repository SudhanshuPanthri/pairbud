"use client"
import "@stream-io/video-react-sdk/dist/css/styles.css"
import { Room } from '@/db/schema';
import {
    Call,
    CallControls,
    CallParticipantsList,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    StreamVideo,
    StreamVideoClient,
    User,
  } from '@stream-io/video-react-sdk';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { generateTokenAction } from "./actions";
import { useRouter } from "next/navigation";
  
  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  
  export const PairBudVideo = ({room}:{room:Room}) => {
    const session=useSession();
    const router=useRouter();

    const [client,setClient]=useState<StreamVideoClient | null>(null);
    const [call,setCall]=useState<Call | null>(null)

    useEffect(()=>{
        if(!room) return;
        if(!session.data){
            return;
        }
        const userId=session.data.user.id;

    const client = new StreamVideoClient({ apiKey, user:{id:userId,name:session.data.user.name ?? undefined,image:session.data.user.image ?? undefined},tokenProvider:()=>generateTokenAction()});
    setClient(client);
    const call = client.call('default', room.id);
    call.join({ create: true });
    setCall(call);
    return ()=>{
        call.leave();
        client.disconnectUser();
    }
    },[session,room])

    return (
        client && call && (
      <StreamVideo client={client}>
        <StreamTheme className="w-full">
        <StreamCall call={call}>
          <SpeakerLayout />
          <CallControls onLeave={()=>{router.push("/rooms")}} />
          <CallParticipantsList onClose={()=>{}}/>
        </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
    );
  };