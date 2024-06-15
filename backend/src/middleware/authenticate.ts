import { NextFunction, Request, Response } from "express";
import { admin } from "../config/firebase-config";

interface AuthenticatedRequest extends Request {
  decodedToken?: admin.auth.DecodedIdToken;
}

async function decodeToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: "Authorization header is missing" });
  }

  const [prefix, token] = authorizationHeader.split(" ");

  if (prefix !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Invalid authorization format. Expected 'Bearer <token>'",
    });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.decodedToken = decodedToken;
    return next();
  } catch (error) {
    console.error("Error verifying token:", error);
    return res
      .status(401)
      .json({ error: "Invalid token", details: (error as Error).message });
  }
}

export default decodeToken;
