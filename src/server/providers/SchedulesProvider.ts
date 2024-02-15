import { AppError } from '../errors/AppError';
import { ISchedulesCreate, ISchedulesRepository } from '../interfaces/SchedulesInterfaces';

import { getHours, isBefore, startOfHour } from 'date-fns';

class SchedulesProvider {

    private repository: ISchedulesRepository;

    constructor(repository: ISchedulesRepository) {
        this.repository = repository;
    }

    public async findAll(date: Date) {
        return await this.repository.findAll(date);
    }

    public async create({ name, phone, date, user_id }: ISchedulesCreate) {
        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted);

        await this.validateSchedule(hourStart, user_id);

        return await this.repository.create({ name, phone, date: hourStart, user_id });
    }

    public async update(id: string, date: Date, user_id: string) {
        const findSchedule = await this.repository.findById(id);
        if (!findSchedule) {
            throw new AppError('Schedule not found', 404);
        }

        const dateFormatted = new Date(date);
        const hourStart = startOfHour(dateFormatted);

        await this.validateSchedule(hourStart, user_id);

        await this.repository.update(id, hourStart);
    }

    public async delete(id: string) {
        const findSchedule = await this.repository.findById(id);
        if (!findSchedule) {
            throw new AppError('Schedule not found', 404);
        }

        await this.repository.delete(id);
    }

    private async validateSchedule(date: Date, user_id: string) {
        if (isBefore(date, new Date())) {
            // verifica se a data já passou
            throw new AppError('It is not possible to schedule a time that has already passed', 400);
        }

        const hours = getHours(date);
        if(hours < 9 || hours > 18){
            throw new AppError('Create a schedule between 9am and 6pm', 400);
        }

        const findSchedule = await this.repository.findByDate(date, user_id);
        if (findSchedule) {
            // verifica se o horário não foi agendado
            throw new AppError('Time is not available', 400);
        }
    }

}

export { SchedulesProvider };