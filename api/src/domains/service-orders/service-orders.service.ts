import { prisma } from '../../config/prismaClient';
import { AppError } from '../../utils/AppError';

interface IServiceOrderData {
  clientId: number;
  device: string;
  issue: string;
  status?: string;
}

export class ServiceOrdersService {
  async getAll() {
    return prisma.serviceOrder.findMany({ include: { client: true } });
  }

  async getById(id: number) {
    return prisma.serviceOrder.findUnique({ where: { id }, include: { client: true } });
  }

  async create(data: IServiceOrderData) {
    if (!data.device || !data.issue) {
      throw new AppError('device e issue são obrigatórios', 400);
    }
    return prisma.serviceOrder.create({ data });
  }

  async update(id: number, data: Partial<IServiceOrderData>) {
    const order = await prisma.serviceOrder.findUnique({ where: { id } });
    if (!order) return null;
    return prisma.serviceOrder.update({ where: { id }, data });
  }

  async delete(id: number) {
    const order = await prisma.serviceOrder.findUnique({ where: { id } });
    if (!order) return false;
    await prisma.serviceOrder.delete({ where: { id } });
    return true;
  }
}