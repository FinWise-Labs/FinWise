// app/api/transactions/route.ts
import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Transaction from '../../../models/Transaction';

export async function POST(request: Request) {
  
  await connectToDatabase(); // Connect to the database
  
  try {
    // Parse the JSON body from the request
    const body = await request.json();
    
    // You should extract userId from the Auth0 token in your authentication middleware
    // For this example, we assume the body contains the userId provided by Auth0
    const { userId, type, amount, category, date, description } = body;
    
    // Validate required fields
    if (!userId || !type || !amount) {
      return NextResponse.json(
        { error: 'Missing required fields: userId, type, and amount are required.' },
        { status: 400 }
      );
    }
    
    // Create and save a new transaction document
    const transaction = new Transaction({
      userId,
      type,
      amount,
      category,
      date: date ? new Date(date) : undefined,
      description,
    });
    
    await transaction.save();
    
    return NextResponse.json(
      { message: 'Transaction added successfully', transaction },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
