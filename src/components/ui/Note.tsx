"use client"

import { Note as Notemodel } from '@prisma/client'
import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';
import AddnoteDialog from './AddnoteDialog';
interface NoteProps{
    note:Notemodel
}
const Note = ({note}:NoteProps) => {
const [showEditDialog, setshowEditDialog] = useState(false);

    const wasUpdated=note.updatedAt>note.createdAt;
    // const createUpdatedAtTimestamp = (wasUpdated ? note.updatedAt : note.createdAt).toDateString();:
    //  Creates a timestamp based on whether the note was updated or not. If the note was updated (wasUpdated is true),
    //   it uses the updatedAt timestamp; otherwise, it uses the createdAt timestamp. The resulting timestamp is then converted to a string using toDateString().
    const createUpdatedAtTimestamp=(
        wasUpdated?note.updatedAt:note.createdAt
    ).toDateString();


  return (
    <>
    <Card className=' cursor-pointer hover:shadow-lg  transition-shadow '
    onClick={()=>setshowEditDialog(true)}
    >
        <CardHeader>
            <CardTitle >{note.title}</CardTitle>
            <CardDescription>
                {createUpdatedAtTimestamp}
                { wasUpdated && "(updated)"}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <p className=' whitespace-pre-line '>
                {note.content}
            </p>
        </CardContent>


    </Card>
    <AddnoteDialog 
    open={showEditDialog}
    setOpen={setshowEditDialog}
    noteToEdit={note}
    />
    </>
  )
}

export default Note
