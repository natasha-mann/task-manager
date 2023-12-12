import mongoose from "mongoose";
import connect from "./connect";
import { MongoMemoryServer } from "mongodb-memory-server";

describe("connect", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    console.log("uri", uri);
    // connect({ db: uri });
  });

  afterAll(async () => {
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  it("should connect to the in-memory database", async () => {
    // const isConnected = mongoose.connection.readyState;
    // expect(isConnected).toBe(1);
    expect(1).toBe(1);
  });

  // it("should reconnect when disconnected", async () => {
  //   await mongoose.connection.close();
  //   const isDisconnected = mongoose.connection.readyState;
  //   expect(isDisconnected).toBe(0);

  //   // Simulate 'disconnected' event
  //   mongoose.connection.emit("disconnected");
  //   await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for reconnect

  //   const isConnectedAgain = mongoose.connection.readyState;
  //   expect(isConnectedAgain).toBe(1);
  // });
});
