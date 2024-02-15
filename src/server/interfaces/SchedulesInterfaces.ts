import { Schedules } from '@prisma/client';


export interface ISchedulesCreate{
    name: string;
    phone: string;
    date: Date;
    user_id: string;
}

export interface ISchedulesRepository{
    create: ({name, phone, date, user_id}: ISchedulesCreate) => Promise<string>
    findByDate: (date: Date, user_id: string) => Promise<Schedules | null>
    findAll: (date: Date) => Promise<Schedules[]>
    findById: (id: string) => Promise<Schedules | null>
    update: (id: string, date: Date) => Promise<void>
    delete: (id: string) => Promise<void>
}