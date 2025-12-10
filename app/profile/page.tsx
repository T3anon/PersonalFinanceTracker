import Image from "next/image";
import Nav from "@/components/nav";

export default function Profile() {
  return (
        <div>
            <Nav items={[{href:"/",label:"Welcome"},{href:"/userhomepage",label:"Home"},{href:"/budget",label:"Budget"},{href:"/profile",label:"Profile"},{href:"/login",label:"Login"},{href:"/api/auth/signout",label:"Logout"}]} />
            <h1 className="font-weight: bold;">User Profile</h1>

            <div className="border: 2px solid black; padding: 16px; width: 300px;">
                <p><strong>Username:</strong> erin_w</p>
                <p><strong>First Name:</strong> Erin</p>
                <p><strong>Last Name:</strong> Whiting</p>
                <p><strong>Email:</strong> erinwhiting06@gmail.com</p>
            </div>
        </div>
    );
}
