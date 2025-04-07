// app/api/goals/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Goal from "../../../models/Goal";

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const body = await request.json();

    const {
      userId,
      name,
      targetAmount,
      currentAmount,
      targetDate,
      description,
      priority,
      monthlyContribution,
    } = body;

    if (!userId || !name || !targetAmount || !currentAmount || !priority || !monthlyContribution || !targetDate) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: userId, name, targetAmount, and currentAmount are required.",
        },
        { status: 400 }
      );
    }

    const goal = new Goal({
      userId,
      name,
      targetAmount,
      currentAmount,
      targetDate: targetDate ? new Date(targetDate) : undefined,
      description,
      priority,
      monthlyContribution,
    });

    await goal.save(); 
    return NextResponse.json(
      { message: "Goal added successfully", goal },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
