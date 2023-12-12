import { Request, Response, NextFunction } from "express";
import { auth, CustomRequest } from "./auth";
import { verifyToken } from "../auth/jwt";
import { JwtPayload } from "jsonwebtoken";

jest.mock("../auth/jwt");

const mockVerifyToken = verifyToken as jest.MockedFunction<typeof verifyToken>;

describe("auth middleware", () => {
  let req: Partial<CustomRequest>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      header: jest.fn(),
    };
    res = {
      sendStatus: jest.fn(),
      status: jest.fn(() => res) as unknown as (status: number) => Response,
      send: jest.fn(),
    };
    next = jest.fn();
  });

  it("should decode the token and attach it to the request", async () => {
    const mockToken = "mockToken";
    const mockDecodedToken: JwtPayload = { sub: "123", iat: 123, exp: 123 };

    (req.header as jest.Mock).mockReturnValue(`Bearer ${mockToken}`);
    mockVerifyToken.mockReturnValue(mockDecodedToken);

    await auth(req as Request, res as Response, next);

    expect(req.token).toEqual(mockDecodedToken);
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if the token is missing", async () => {
    (req.header as jest.Mock).mockReturnValue(null);

    await auth(req as Request, res as Response, next);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it("should return 401 if the token is invalid", async () => {
    const mockToken = "mockToken";

    (req.header as jest.Mock).mockReturnValue(`Bearer ${mockToken}`);
    mockVerifyToken.mockImplementation(() => {
      throw new Error();
    });

    await auth(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith("User not authenticated");
  });
});
