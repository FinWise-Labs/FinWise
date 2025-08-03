import  connectToDatabase  from '@/lib/mongodb';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId }: { userId: string } = await req.json();
    const { db } = await connectToDatabase();

    const goals = await db.collection('goals').find({ userId }).toArray();
    const transactions = await db.collection('transactions').find({ userId }).toArray();

    const userData = `
      Financial Goals:
      ${goals.map((g: any) => `- ${g.title}: Saved $${g.savedAmount} of $${g.targetAmount}`).join('\n')}

      Recent Transactions:
      ${transactions.map((t: any) => `- ${t.title}: $${t.amount}`).join('\n')}
    `;

    const prompt = `
      Analyze the user's financial goals and recent spending.
      Give 3 personalized financial advice suggestions.
      Be concise, practical, and friendly.

      User Data:
      ${userData}
    `;

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY as string);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const advice = response.text();

    return NextResponse.json({ advice });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
