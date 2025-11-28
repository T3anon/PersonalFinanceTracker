import Image from "next/image";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <div>
    <Nav items={[{href:"/",label:"Home"},{href:"/budget",label:"Budget"},{href:"/profile",label:"Profile"},{href:"/login",label:"Login"}]} />
    </div>           
    
  );
}