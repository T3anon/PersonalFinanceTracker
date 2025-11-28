import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div>
      <Nav items={[{href:"/",label:"Home"},{href:"/budget",label:"Budget"},{href:"/profile",label:"Profile"},{href:"/login",label:"Login"}]} />
      <main>
        <h2>Server Session</h2>
        <pre>{JSON.stringify(session)}</pre>
        <h2>Client Call</h2>
        <User />
      </main>
    </div> 
             
  );
}
