import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { verifyRefreshToken, generateAccessToken } from '../../utils/token';

const authService = new AuthService();

const ACCESS_TOKEN_MAX_AGE = 15 * 60 * 1000;       // 15 min
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 dias

export class AuthController {
  async register(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await authService.register(email, password);
    return res.status(201).json(user);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { accessToken, refreshToken, user } = await authService.login(email, password);

    res.cookie('token', accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: ACCESS_TOKEN_MAX_AGE,
    });

    // path restrito: esse cookie só é enviado quando o front chama /auth/refresh
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: REFRESH_TOKEN_MAX_AGE,
      path: '/auth/refresh',
    });

    return res.status(200).json({ user });
  }

  async logout(req: Request, res: Response) {
    res.clearCookie('token');
    res.clearCookie('refreshToken', { path: '/auth/refresh' });
    return res.status(200).json({ message: 'Logout realizado com sucesso' });
  }

  async me(req: Request, res: Response) {
    return res.status(200).json({ user: req.user });
  }

  async refresh(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ error: 'Refresh token não fornecido' });
    }

    try {
      const payload = verifyRefreshToken(refreshToken);
      const newAccessToken = generateAccessToken({ id: payload.id, email: payload.email });

      res.cookie('token', newAccessToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: ACCESS_TOKEN_MAX_AGE,
      });

      return res.status(200).json({ message: 'Token renovado com sucesso' });
    } catch {
      return res.status(401).json({ error: 'Refresh token inválido ou expirado' });
    }
  }
}