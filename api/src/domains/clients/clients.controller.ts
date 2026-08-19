import { Request, Response } from 'express';
import { ClientsService } from './clients.service';

const clientsService = new ClientsService();

export class ClientsController {
  async getAll(req: Request, res: Response) {
    const clients = await clientsService.getAll();
    return res.status(200).json(clients);
  }

  async getById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await clientsService.getById(id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.status(200).json(client);
  }

  async create(req: Request, res: Response) {
    const client = await clientsService.create(req.body);
    return res.status(201).json(client);
  }

  async update(req: Request, res: Response) {
    const id = Number(req.params.id);
    const client = await clientsService.update(id, req.body);
    if (!client) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.status(200).json(client);
  }

  async delete(req: Request, res: Response) {
    const id = Number(req.params.id);
    const deleted = await clientsService.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Cliente não encontrado' });
    }
    return res.status(204).send();
  }
}