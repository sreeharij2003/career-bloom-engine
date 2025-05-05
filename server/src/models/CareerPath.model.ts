
import mongoose, { Document, Schema } from 'mongoose';

interface ICareerStep {
  year: number;
  title: string;
  description: string;
  skills: string[];
}

export interface ICareerPath extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  query: string;
  steps: ICareerStep[];
  createdAt: Date;
}

const CareerPathSchema = new Schema<ICareerPath>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  query: {
    type: String,
    required: true,
  },
  steps: [{
    year: Number,
    title: String,
    description: String,
    skills: [String],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICareerPath>('CareerPath', CareerPathSchema);
