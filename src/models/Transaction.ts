// models/Transaction.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITransaction extends Document {
  userId: string;
  type: "income" | "expense";
  amount: number;
  category?: string;
  date: Date;
  description?: string;
  note?: string;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now, required: true },
  description: { type: String, required: true },
  note: { type: String, default: "null" },
});

const Transaction: Model<ITransaction> =
  mongoose.models.Transaction ||
  mongoose.model<ITransaction>("Transaction", TransactionSchema);
export default Transaction;
