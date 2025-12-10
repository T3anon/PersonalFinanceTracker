import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { User } from "./user";
import { LoginButton, LogoutButton } from "./auth";

export default async function Welcome() {
  const session = await getServerSession(authOptions)

  return (
    <div className="min-h-screen p-4">
      <Nav items={[{href:"/",label:"Welcome"},{href:"/userhomepage",label:"Home"},{href:"/budget",label:"Budget"},{href:"/login",label:"Login"},{href:"/api/auth/signout",label:"Logout"}]} />
      
    </div> 
             
  );
}
