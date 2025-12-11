'use server'

import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BudgetPage from "./budget-page";

export default async function Budget() {
  // Check authentication and redirect if not logged in
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Get all transactions for the logged-in user
  const transactions = await prisma.categories.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
    orderBy: {
      date: 'desc'
    }
  });

  // Get all budget limits for the logged-in user
  const budgets = await prisma.categoryBudget.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  // Convert transactions to plain objects for client component
  const transactionsData = transactions.map((tx) => ({
    id: tx.id,
    category: tx.category,
    cost: Number(tx.cost),
    place: tx.place,
    date: tx.date.toISOString(),
    userId: tx.userId,
  }));

  // Convert budgets to plain objects
  const budgetsData = budgets.map((b) => ({
    id: b.id,
    userId: b.userId,
    category: b.category,
    budgetLimit: Number(b.budgetLimit),
  }));

  return (
    <div className="min-h-screen p-4">
      <Nav
        items={[
          { href: "/", label: "Welcome" },
          { href: "/userhomepage", label: "Home" },
          { href: "/budget", label: "Budget" },
          { href: "/login", label: "Login" },
          {href:"/api/auth/signout",label:"Logout"}
        ]}
        email={session.user.email || undefined}
      />
      <BudgetPage transactions={transactionsData} budgets={budgetsData} />
    </div>
  );
}