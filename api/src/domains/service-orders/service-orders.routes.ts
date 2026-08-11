import { Router } from 'express';
import { authMiddleware } from '../../middlewares/authMiddleware';
import { ServiceOrdersController } from './service-orders.controller';

const serviceOrdersRoutes = Router();
const serviceOrdersController = new ServiceOrdersController();

// Protege todas as rotas de service-orders
serviceOrdersRoutes.use(authMiddleware);

serviceOrdersRoutes.get('/', serviceOrdersController.getAll.bind(serviceOrdersController));
serviceOrdersRoutes.get('/:id', serviceOrdersController.getById.bind(serviceOrdersController));
serviceOrdersRoutes.post('/', serviceOrdersController.create.bind(serviceOrdersController));
serviceOrdersRoutes.put('/:id', serviceOrdersController.update.bind(serviceOrdersController));
serviceOrdersRoutes.delete('/:id', serviceOrdersController.delete.bind(serviceOrdersController));

export { serviceOrdersRoutes };