'use server'

import Image from "next/image";
import Nav from "@/components/nav";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import BudgetCategory from "./budget-category";

export default async function Budget() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Get all transactions for the logged-in user
  const transactions = await prisma.categories.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  // Get all budget limits for the logged-in user
  const budgets = await prisma.categoryBudget.findMany({
    where: {
      userId: parseInt(session.user.id),
    },
  });

  // Create a map of category to budget limit
  const budgetMap = new Map(budgets.map((b) => [b.category, Number(b.budgetLimit)]));

  // Group transactions by category
  const categoryMap = new Map<
    string,
    {
      name: string;
      totalSpent: number;
      budgetLimit: number;
      transactions: Array<{
        date: string;
        place: string;
        amount: number;
      }>;
    }
  >();

  transactions.forEach((tx) => {
    if (!categoryMap.has(tx.category)) {
      const budgetLimit = budgetMap.get(tx.category) ?? 500;
      categoryMap.set(tx.category, {
        name: tx.category,
        totalSpent: 0,
        budgetLimit: budgetLimit as number,
        transactions: [],
      });
    }

    const group = categoryMap.get(tx.category)!;
    group.totalSpent += Number(tx.cost);
    group.transactions.push({
      date: tx.date.toLocaleDateString(),
      place: tx.place,
      amount: Number(tx.cost),
    });
  });

  const budgetGroups = Array.from(categoryMap.values());

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
      />
      <h1 className="text-2xl font-bold text-center my-6">Budget Overview</h1>

      <div className="text-center mb-6">
        <a
          href="/budget/create-transaction"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          + Create Transaction
        </a>
      </div>

      {budgetGroups.length === 0 ? (
        <p className="text-center text-gray-500">No transactions yet. Create one to get started!</p>
      ) : null}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgetGroups.map((group, index) => (
          <BudgetCategory key={index} group={group} />
        ))}
      </div>
    </div>
  );
}