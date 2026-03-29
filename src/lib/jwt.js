import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || "eventmanagementtesting";

export function generateToken(id) {
  return jwt.sign({ id }, SECRET, { expiresIn: '7d' });
}

// Optional: verify function for protected routes
export function verifyToken(token) {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
}