import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { like } from "drizzle-orm";

export async function getRooms(search: string | undefined) {
  unstable_noStore(); //marks the function dynamic
  const where = search ? like(room.language, `%${search}%`) : undefined;
  const rooms = await db?.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  const singleRoom = await db?.query.room.findFirst({
    where: eq(room.id, roomId),
  });
  return singleRoom;
}
