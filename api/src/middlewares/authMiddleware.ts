import { Request, Response, NextFunction } from 'express';
import { verifyAccessToken } from '../utils/token';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = { id: payload.id, email: payload.email };
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' });
  }
}