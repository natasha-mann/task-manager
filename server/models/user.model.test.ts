import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import User, { IUser } from "./user.model";
import * as bcrypt from "bcrypt";

describe("User Model Test", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("create & save user successfully", async () => {
    const userData: IUser = new User({
      email: "test@test.com",
      password: "testPassword",
      firstName: "Test",
      lastName: "User",
    });
    const output = await userData.save();

    expect(output._id).toBeDefined();
    expect(output.email).toBe(userData.email);
    expect(output.firstName).toBe(userData.firstName);
    expect(output.lastName).toBe(userData.lastName);
    expect(await bcrypt.compare("testPassword", output.password)).toBe(true);
  });

  it("create user without required field should failed", async () => {
    const userData = new User({ email: "test@test.com" });
    let err: any;
    try {
      const output = await userData.save();
      err = output;
    } catch (error) {
      err = error;
    }

    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.password).toBeDefined();
    expect(err.errors.firstName).toBeDefined();
    expect(err.errors.lastName).toBeDefined();
  });
});
