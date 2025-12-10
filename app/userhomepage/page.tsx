import Image from "next/image";
import Nav from "@/components/nav";

export default function UserHomePage() {
  return (
        <div>
            <Nav items={[{href:"/",label:"Welcome"},{href:"/userhomepage",label:"Home"},{href:"/budget",label:"Budget"},{href:"/login",label:"Login"},{href:"/api/auth/signout",label:"Logout"}]} />
            
        </div>
    );
}
