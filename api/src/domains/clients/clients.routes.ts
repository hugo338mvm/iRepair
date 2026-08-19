import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { ClientsController } from './clients.controller';

const clientsRoutes = Router();
const clientsController = new ClientsController();

clientsRoutes.use(authMiddleware);

clientsRoutes.get('/', clientsController.getAll.bind(clientsController));
clientsRoutes.get('/:id', clientsController.getById.bind(clientsController));
clientsRoutes.post('/', clientsController.create.bind(clientsController));
clientsRoutes.put('/:id', clientsController.update.bind(clientsController));
clientsRoutes.delete('/:id', clientsController.delete.bind(clientsController));

export { clientsRoutes };