import { Request, Response } from 'express';
import { ServiceOrdersService } from './service-orders.service';

const serviceOrdersService = new ServiceOrdersService();

export class ServiceOrdersController {
  async getAll(req: Request, res: Response) {
    const orders = await serviceOrdersService.getAll();
    return res.status(200).json(orders);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await serviceOrdersService.getById(id);
    if (!order) {
      return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
    }
    return res.status(200).json(order);
  }

  async create(req: Request, res: Response) {
    const order = await serviceOrdersService.create(req.body);
    return res.status(201).json(order);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const order = await serviceOrdersService.update(id, req.body);
    if (!order) {
      return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
    }
    return res.status(200).json(order);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await serviceOrdersService.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Ordem de serviço não encontrada' });
    }
    return res.status(204).send();
  }
}