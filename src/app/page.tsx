import Image from "next/image";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default function Home() {
  const {userId}=auth();
  if(userId) redirect("/notes")
  return (
    <main className="flex h-screen flex-col  items-center justify-center">
      <div className="flex items-center gap-4 ">
        <Image src={logo} alt=" log for home screen" width={100} height={100} />
        <span className=" text-4xl font-extrabold tracking-tight lg:text-5xl ">
          Notus
        </span>
      </div>
      <p
        className=" m-5  max-w-prose  text-center
      "
      >
        Welcome to the most advanced note-taking experience! Our app combines
        the power of OpenAI, Next.js, Shadcn, Clerk, and more to provide you
        with an unparalleled note-taking solution.
      </p>
      <Button size="lg" asChild className=" top-4">
        <Link href={"/notes"}>Open</Link>
      </Button>
    </main>
  );
}
