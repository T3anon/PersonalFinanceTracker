import Image from "next/image";
import Nav from "@/components/nav";

export default function UserHomePage() {
  return (
        <div>
            <Nav items={[{href:"/",label:"Welcome"},{href:"/userhomepage",label:"Home"},{href:"/budget",label:"Budget"},{href:"/profile",label:"Profile"},{href:"/api/auth/signin",label:"Login"},{href:"/api/auth/signout",label:"Logout"}]} />
            
        </div>
    );
}
