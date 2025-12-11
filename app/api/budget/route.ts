import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Updates or creates a budget limit for a category
export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);

  // Ensure user is authenticated
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { category, budgetLimit } = body;
    const userId = parseInt(session.user.id);

    if (!category || budgetLimit === undefined) {
      return NextResponse.json(
        { error: "Missing category or budgetLimit" },
        { status: 400 }
      );
    }

    const budget = await prisma.categoryBudget.upsert({
      where: {
        userId_category: {
          userId,
          category,
        },
      },
      update: {
        budgetLimit: budgetLimit,
      },
      create: {
        userId,
        category,
        budgetLimit: budgetLimit,
      },
    });

    return NextResponse.json(budget, { status: 200 });
  } catch (error) {
    console.error("Budget update error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to update budget";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
