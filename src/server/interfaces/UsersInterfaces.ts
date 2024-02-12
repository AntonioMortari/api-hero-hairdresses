import { Users } from '@prisma/client';

export interface IUsersCreate{
    name: string;
    email: string;
    password: string
}

export interface IUsersRepository{
    findAll: () => Promise<Users[]>
    findByEmail: (email: string) => Promise<Users | null>
    create: ({name, email, password}: IUsersCreate) => Promise<string>
}