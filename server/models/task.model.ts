import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "./user.model";

export enum Status {
  inProgress = "inProgress",
  toDo = "toDo",
  done = "done",
}

export enum PriorityLevel {
  levelOne = "1",
  levelTwo = "2",
  levelThree = "3",
}

export interface ITask extends Document {
  title: string;
  details?: string;
  priorityLevel: PriorityLevel;
  status: Status;
  user: IUser["_id"];
}

const TaskSchema: Schema = new Schema({
  title: { type: String, required: true },
  details: { type: String, required: false },
  priorityLevel: {
    type: String,
    enum: Object.values(PriorityLevel),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(Status),
    required: true,
  },
  user: { type: Schema.Types.ObjectId, required: true },
});

// Export the model and return your IUser interface
export default mongoose.model<ITask>("Task", TaskSchema);
