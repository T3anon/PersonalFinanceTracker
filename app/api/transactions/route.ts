import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { category, place, cost, date, userId } = body;

    // Verify the userId matches the session user
    if (parseInt(session.user.id) !== userId) {
      return NextResponse.json(
        { error: "Unauthorized - user ID mismatch" },
        { status: 401 }
      );
    }

    // Validate required fields
    if (!category || !place || !cost || !date) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const transaction = await prisma.categories.create({
      data: {
        category,
        place,
        cost: cost,
        date: new Date(date + "T00:00:00Z"),
        userId,
      },
    });

    return NextResponse.json(transaction, { status: 201 });
  } catch (error) {
    console.error("Transaction creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to create transaction";
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
