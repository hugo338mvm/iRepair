import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AppError } from '../utils/AppError';
import { authRoutes } from '../domains/auth/auth.routes';
import { clientsRoutes } from '../domains/clients/clients.routes';
import { serviceOrdersRoutes } from '../domains/service-orders/service-orders.routes';


const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // origem do front (Vite)
  credentials: true,               // obrigatório para o cookie trafegar
}));
app.use(cookieParser());
app.use(express.json());

// as rotas de cada domínio serão registradas aqui nas próximas fases

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ error: error.message });
  }
  console.error(error);
  return res.status(500).json({ error: 'Erro interno do servidor' });
});

app.use('/auth', authRoutes);

app.use('/clients', clientsRoutes);

app.use('/service-orders', serviceOrdersRoutes);

export { app };