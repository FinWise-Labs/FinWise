import connectToDatabase from "@/lib/mongodb";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import Goal from "@/models/Goal";
import Transaction from "@/models/Transaction";

interface GoalData {
  _id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  category?: string;
}

interface TransactionData {
  _id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  type?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { userId, message }: { userId: string; message: string } =
      await req.json();

    if (!userId || !message) {
      return NextResponse.json(
        { message: "UserId and message are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Fetch user's financial data using Mongoose models
    const goals = (await Goal.find({ userId }).lean()).map((goal) => ({
      ...goal,
      _id: goal._id.toString(),
    })) as GoalData[];

    const transactions = (
      await Transaction.find({ userId }).sort({ date: -1 }).limit(20).lean()
    ).map((transaction) => ({
      ...transaction,
      _id: transaction._id.toString(),
    })) as TransactionData[];

    // Create user data summary
    const userData = `
FINANCIAL GOALS:
${
  goals
    .map(
      (g: GoalData) =>
        `- ${g.name}: ${g.currentAmount} saved of ${g.targetAmount} target`
    )
    .join("\n") || "No active goals"
}

RECENT TRANSACTIONS:
${
  transactions
    .map(
      (t: TransactionData) => `- ${t.description}: ${t.amount} (${t.category})`
    )
    .join("\n") || "No recent transactions"
}
`;

    // Create prompt for AI
    const prompt = `
You are a professional financial advisor. The user asked: "${message}"

Here is their financial data:
${userData}

Provide personalized financial advice based on their specific situation. Be helpful, encouraging, and specific. Keep the response conversational and under 150 words.
`;

    // Get AI response from Google Gemini
    const genAI = new GoogleGenerativeAI(
      process.env.GOOGLE_GEMINI_API_KEY as string
    );
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    return NextResponse.json({ advice });
  } catch (error) {
    console.error("AI Advisor API Error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
