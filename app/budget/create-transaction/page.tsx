'use server'

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Nav from "@/components/nav";
import CreateTransactionForm from "./form";

export default async function CreateTransactionPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Nav
        items={[
          { href: "/", label: "Welcome" },
          { href: "/userhomepage", label: "Home" },
          { href: "/budget", label: "Budget" },
          { href: "/login", label: "Login" },
          { href: "/api/auth/signout", label: "Logout" },
        ]}
      />
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 mt-10">
        <h1 className="text-2xl font-bold mb-6">Create Transaction</h1>
        <CreateTransactionForm userId={session.user.id} />
      </div>
    </div>
  );
}
