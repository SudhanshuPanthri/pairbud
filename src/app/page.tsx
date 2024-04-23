import { GoogleGeminiWrapper } from "@/components/Google-Gemini-Wrapper";
// import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { db } from "@/db";
import Image from "next/image";

export default async function Home() {

  const items=await db.query.testing.findMany();

  return (
    <main className="">
      <GoogleGeminiWrapper />
      {/* {items.map((item)=>(
        <div key={item.id}>
          {item.name}
        </div>
      ))} */}
    </main>
  );
}
