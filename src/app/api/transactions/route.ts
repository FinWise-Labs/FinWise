// app/api/transactions/route.ts
import { NextResponse } from "next/server";
import connectToDatabase from "../../../lib/mongodb";
import Transaction from "../../../models/Transaction";

// GET - Fetch transactions for a user with filtering
export async function GET(request: Request) {
  await connectToDatabase();

  try {
    // getting the userId from the URL
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    // Build filter object
    const filter: any = { userId };

    // Search term filter (case-insensitive search on description)
    const searchTerm = searchParams.get('search');
    if (searchTerm) {
      filter.description = { $regex: searchTerm, $options: 'i' };
    }

    // Category filter
    const category = searchParams.get('category');
    if (category && category !== 'all') {
      filter.category = category;
    }

    // Type filter
    const type = searchParams.get('type');
    if (type && type !== 'all') {
      filter.type = type;
    }

    // Date range filter
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    if (dateFrom || dateTo) {
      filter.date = {};
      if (dateFrom) {
        filter.date.$gte = new Date(dateFrom);
      }
      if (dateTo) {
        // Add one day to include the entire "to" date
        const toDate = new Date(dateTo);
        toDate.setDate(toDate.getDate() + 1);
        filter.date.$lt = toDate;
      }
    }

    // Pagination parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');
    const skip = (page - 1) * limit;

    // Sorting parameters
    const sortBy = searchParams.get('sortBy') || 'date';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;
    const sort: any = { [sortBy]: sortOrder };

    // Execute queries
    const [transactions, totalCount, categories] = await Promise.all([
      // Get paginated and filtered transactions
      Transaction.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(), // Use lean() for better performance
      
      // Get total count for pagination
      Transaction.countDocuments(filter),
      
      // Get unique categories for the user (for filter dropdown)
      Transaction.distinct('category', { userId })
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limit);
    const hasMore = skip + transactions.length < totalCount;

    return NextResponse.json(
      {
        transactions,
        totalCount,
        currentPage: page,
        totalPages,
        hasMore,
        categories: ['all', ...categories.sort()], // Add 'all' option and sort categories
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// POST - Create a new transaction
export async function POST(request: Request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const { userId, type, amount, category, date, description, note } = body;

    // Validate required fields
    if (!userId || !type || !amount) {
      return NextResponse.json(
        {
          error: "Missing required fields: userId, type, and amount are required.",
        },
        { status: 400 }
      );
    }

    // Validate transaction type
    if (!['income', 'expense'].includes(type)) {
      return NextResponse.json(
        { error: "Type must be either 'income' or 'expense'" },
        { status: 400 }
      );
    }

    // Create and save a new transaction document
    const transaction = new Transaction({
      userId,
      type,
      amount: parseFloat(amount),
      category: category || 'Uncategorized',
      date: date ? new Date(date) : new Date(),
      description: description || '',
      note: note || ''
    });

    await transaction.save();

    return NextResponse.json(
      { message: "Transaction added successfully", transaction },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// PUT - Update an existing transaction
export async function PUT(request: Request) {
  await connectToDatabase();

  try {
    const body = await request.json();
    const { transactionId, userId, type, amount, category, date, description, note } = body;

    if (!transactionId || !userId) {
      return NextResponse.json(
        { error: "transactionId and userId are required" },
        { status: 400 }
      );
    }

    // Find the transaction and ensure it belongs to the user
    const existingTransaction = await Transaction.findOne({
      _id: transactionId,
      userId: userId
    });

    if (!existingTransaction) {
      return NextResponse.json(
        { error: "Transaction not found or unauthorized" },
        { status: 404 }
      );
    }

    // Update the transaction
    const updatedTransaction = await Transaction.findByIdAndUpdate(
      transactionId,
      {
        type: type || existingTransaction.type,
        amount: amount ? parseFloat(amount) : existingTransaction.amount,
        category: category !== undefined ? category : existingTransaction.category,
        date: date ? new Date(date) : existingTransaction.date,
        description: description !== undefined ? description : existingTransaction.description,
        note: note !== undefined ? note : existingTransaction.note
      },
      { new: true } // Return the updated document
    );

    return NextResponse.json(
      { message: "Transaction updated successfully", transaction: updatedTransaction },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error updating transaction:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete a transaction
export async function DELETE(request: Request) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(request.url);
    const transactionId = searchParams.get('transactionId');
    const userId = searchParams.get('userId');

    if (!transactionId || !userId) {
      return NextResponse.json(
        { error: "transactionId and userId are required" },
        { status: 400 }
      );
    }

    const deletedTransaction = await Transaction.findOneAndDelete({
      _id: transactionId,
      userId: userId
    });

    if (!deletedTransaction) {
      return NextResponse.json(
        { error: "Transaction not found or unauthorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Transaction deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error deleting transaction:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}