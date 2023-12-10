import Note from "@/components/ui/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Notus",
};
const page = async () => {
  const { userId } = auth();
  if (!userId) throw Error("UserId is an undefined");
  const allNotes = await prisma.note.findMany({ where: { userId } });

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note note={note} key={note.id} />
      ))}
      {allNotes.length === 0 && (
        <div className=" col-span-full  text-center">
          {"You don't have any notes yet.Why don't you create one dude?"}
        </div>
      )}
    </div>
  );
};

export default page;
