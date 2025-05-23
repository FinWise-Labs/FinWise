import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Goal from "../../../models/Goal";
import type { SortOrder } from "mongoose";

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

    if (
      !userId ||
      !name ||
      !targetAmount ||
      !currentAmount ||
      !priority ||
      !monthlyContribution ||
      !targetDate
    ) {
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

export async function GET(request: Request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Build filter
    const filter: Record<string, any> = { userId };

    // Search in both name and description fields
    const search = searchParams.get("search");
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    // Priority filter - keep original case
    const priorityParam = searchParams.get("priority");
    if (priorityParam && priorityParam !== "all") {
      filter.priority = priorityParam; // Don't convert to lowercase
    }

    // Parse sort params
    const sortBy = searchParams.get("sortBy") || "targetDate";
    const sortOrder: SortOrder =
      searchParams.get("sortOrder") === "asc" ? "asc" : "desc";

    const sortOptions: Record<string, SortOrder> = {
      [sortBy]: sortOrder,
    };

    const [goals, totalCount, distinctPriorities] = await Promise.all([
      Goal.find(filter).sort(sortOptions).lean(),
      Goal.countDocuments(filter),
      Goal.distinct("priority", { userId }),
    ]);

    // Keep priorities in their original case and sort them
    const priorities = ["all", ...distinctPriorities.sort()];

    return NextResponse.json(
      { goals, totalCount, priorities },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error fetching goals:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const {
      goalId,
      userId,
      name,
      targetAmount,
      currentAmount,
      targetDate,
      description,
      priority,
      monthlyContribution,
    } = body;

    if (!goalId || !userId) {
      return NextResponse.json(
        { error: "Goal ID and UserId are required" },
        { status: 400 }
      );
    }

    const existingGoal = await Goal.findOne({
      _id: goalId,
      userId: userId,
    });

    if (!existingGoal) {
      return NextResponse.json(
        { error: "Goal not found or unauthorized" },
        { status: 404 }
      );
    }

    const updatedGoal = await Goal.findByIdAndUpdate(
      goalId, // Ensure user can only update their own goals
      {
        name: name || existingGoal.name,
        targetAmount: targetAmount
          ? parseFloat(targetAmount)
          : existingGoal.targetAmount,
        currentAmount: currentAmount
          ? parseFloat(currentAmount)
          : existingGoal.currentAmount,
        targetDate: targetDate ? new Date(targetDate) : existingGoal.targetDate,
        description:
          description !== undefined ? description : existingGoal.description,
        priority: priority !== undefined ? priority : existingGoal.priority,
        monthlyContribution: monthlyContribution
          ? parseFloat(monthlyContribution)
          : existingGoal.monthlyContribution,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Goal updated successfully", goal: updatedGoal },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating goal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const goalId = searchParams.get("id");
    const userId = searchParams.get("userId");

    if (!goalId || !userId) {
      return NextResponse.json(
        { error: "transactionId and userId are required" },
        { status: 400 }
      );
    }

    const deletedGoal = await Goal.findOneAndDelete({
      _id: goalId,
      userId: userId,
    });

    if (!deletedGoal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Goal deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting goal:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
