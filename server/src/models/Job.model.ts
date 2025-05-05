
import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  title: string;
  company: string;
  logo?: string;
  location: string;
  type: string;
  posted: string;
  description: string;
  tags?: string[];
  applicationUrl: string;
  salary?: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    logo: { type: String },
    location: { type: String, required: true },
    type: { type: String, required: true },
    posted: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    applicationUrl: { type: String, required: true },
    salary: { type: String },
    source: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model<IJob>('Job', jobSchema);
