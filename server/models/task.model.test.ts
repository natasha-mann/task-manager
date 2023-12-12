import mongoose from "mongoose";
import Task, { ITask, Status, PriorityLevel } from "./task.model";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("Task Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("create & save task successfully", async () => {
    const userData = { _id: new mongoose.Types.ObjectId() };
    const input: ITask = new Task({
      title: "Test Task",
      priorityLevel: PriorityLevel.levelOne,
      status: Status.toDo,
      user: userData._id,
    });
    const output = await input.save();

    expect(output._id).toBeDefined();
    expect(output.title).toBe(input.title);
    expect(output.priorityLevel).toBe(input.priorityLevel);
    expect(output.status).toBe(input.status);
    expect(output.user.toString()).toBe(input.user.toString());
  });

  it("create task without required field should failed", async () => {
    const userData = { _id: new mongoose.Types.ObjectId() };
    const input = new Task({ user: userData._id });
    let err: any;
    try {
      const output = await input.save();
      err = output;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
    expect(err.errors.priorityLevel).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });
});
