import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGoal extends Document {
  _id: string;
  userId: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate?: Date;
  description?: string;
  priority?: 'High' | 'Medium' | 'Low'; // Changed to match frontend casing
  monthlyContribution?: number;
}

const GoalSchema: Schema = new Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, required: true },
  targetDate: { type: Date, required: true },
  description: { type: String, default: '' },
  priority: { 
    type: String, 
    enum: ['High', 'Medium', 'Low'], // Changed to match frontend casing
    required: true, 
    default: 'Medium' 
  },
  monthlyContribution: { type: Number, required: true, default: 0 },
});

// Add a transform to convert _id to id for JSON responses
GoalSchema.set('toJSON', {
  transform: function(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    return ret;
  }
});

const Goal: Model<IGoal> = mongoose.models.Goal || mongoose.model<IGoal>('Goal', GoalSchema);
export default Goal;