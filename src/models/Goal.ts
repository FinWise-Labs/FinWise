// models/Goal.ts
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGoal extends Document {
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
  monthlyContribution?: number;
}

const GoalSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  description: { type: String, default: 'null' },
  priority: { type: String, enum: ['high', 'medium', 'low'], required: true, default: 'medium' },
  monthlyContribution: { type: Number, required: true, default: 0 },
});

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);
export default Goal;
