import { Schedules } from '@prisma/client';
import { prisma } from '../database/prisma';
import { ISchedulesCreate, ISchedulesRepository } from '../interfaces/SchedulesInterfaces';
import { endOfDay, startOfDay } from 'date-fns';

class SchedulesRepository implements ISchedulesRepository {

    public async findAll(date: Date): Promise<Schedules[]> {
        // retorna todos os agendamentos do dia em ordem crescente
        return await prisma.schedules.findMany({
            where: {
                date: {
                    gte: startOfDay(date),
                    lt: endOfDay(date)
                }
            },
            orderBy: {
                date: 'asc'
            }
        });
    }

    public async findById(id: string): Promise<Schedules | null> {
        return await prisma.schedules.findUnique({
            where: { id }
        });
    }

    public async create({ name, phone, date, user_id }: ISchedulesCreate) {
        const result = await prisma.schedules.create({
            data: {
                name,
                phone,
                date,
                user_id
            }
        });

        return result.id;
    }

    public async update(id: string, date: Date): Promise<void> {
        await prisma.schedules.update({
            where: { id },
            data: { date }
        });
    }

    public async delete(id: string): Promise<void>{
        await prisma.schedules.delete({
            where:{id}
        });
    }

    public async findByDate(date: Date, user_id: string): Promise<Schedules | null> {
        return await prisma.schedules.findFirst({
            where: { date, user_id }
        });
    }

}

export { SchedulesRepository };