"use client"
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import AddnoteDialog from "@/components/ui/AddnoteDialog";
import ThemeToggle from "@/components/ui/ThemeToggle";
import {dark} from "@clerk/themes"
import { useTheme } from "next-themes";

const NavBar = () => {
  const {theme} =useTheme();

const [showAddNoteDialog, setshowAddNoteDialog] = useState(false);
  return (
    <>

    <div className="p-4 shadow  ">
      <div className=" m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 ">
        <Link href={"/notes"} className="flex items-center gap-1">
          <Image src={logo} alt="logo of website" width={40} height={40} />
          <span className="font-bold">Notus</span>
        </Link>
        <div className="flex items-center gap-2">
            <UserButton afterSignOutUrl="/" appearance={{
              baseTheme:(theme==="dark"?dark:undefined),
                elements:{avatarBox:{width:"2.5rem",height:"2.5rem"}}

            }}/>
            <ThemeToggle/>
            <Button onClick={()=>setshowAddNoteDialog(true)}>
                <PlusIcon size={20} className="mr-2"/>
                Add notes
            </Button>
        </div>
      </div>
    </div>
    <AddnoteDialog open={showAddNoteDialog} setOpen={setshowAddNoteDialog}/>

    </>
  );
};

export default NavBar;
