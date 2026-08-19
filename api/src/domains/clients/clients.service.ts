import { prisma } from '../../config/prismaClient';
import { AppError } from '../../utils/AppError';

interface IClientData {
  name: string;
  phone: string;
  email: string;
}

export class ClientsService {
  async getAll() {
    return prisma.client.findMany();
  }

  async getById(id: number) {
    return prisma.client.findUnique({ where: { id } });
  }

  async create(data: IClientData) {
    if (!data.name) {
      throw new AppError('O nome é obrigatório', 400);
    }
    return prisma.client.create({ data });
  }

  async update(id: number, data: Partial<IClientData>) {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return null;
    return prisma.client.update({ where: { id }, data });
  }

  async delete(id: number) {
    const client = await prisma.client.findUnique({ where: { id } });
    if (!client) return false;
    await prisma.client.delete({ where: { id } });
    return true;
  }
}