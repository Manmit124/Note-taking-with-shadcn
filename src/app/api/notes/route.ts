import { notesIndex } from "@/lib/db/pinecone";
import prisma from "@/lib/db/prisma";
import { getEmbedding } from "@/lib/openai";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // zod validation
    const parserResult = createNoteSchema.safeParse(body);
    if (!parserResult.success) {
      console.log(parserResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { title, content } = parserResult.data;
    const { userId } = auth();
    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    // vector emebedding
    // const embedding = await getEmbeddingForNote(title, content);
    // const note = await prisma.$transaction(async (tx) => {
      const note = await prisma.note.create({
        data: {
          title,
          content,
          userId,
        },
      });
      // await notesIndex.upsert([
      //   {
      //     id: note.id,
      //     values: embedding,
      //     metadata: { userId },
      //   },
      // ]);
      // return note;
    // });
    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parserResult = updateNoteSchema.safeParse(body);
    if (!parserResult.success) {
      console.log(parserResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { id, title, content } = parserResult.data;
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();
    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    const updateNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });
    return Response.json({ updateNote }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ eror: "Internal server error" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parserResult = deleteNoteSchema.safeParse(body);
    if (!parserResult.success) {
      console.log(parserResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }
    const { id } = parserResult.data;
    const note = await prisma.note.findUnique({ where: { id } });
    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();
    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }
    await prisma.note.delete({ where: { id } });
    return Response.json({ message: "Note deleted" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ eror: "Internal server error" }, { status: 500 });
  }
}
// just format the notes before we embeded then
// async function getEmbeddingForNote(title: string, content: string | undefined) {
//   return getEmbedding(title + "\n\n" + content ?? "");
// }
