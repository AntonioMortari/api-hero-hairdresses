import { Users } from '@prisma/client';

export interface IUsersCreate{
    name: string;
    email: string;
    password: string
}

export interface IUsersUpdate{
    name: string;
    password: string;
    old_password: string;
    avatar_url: string
}

export interface IUsersRepository{
    findAll: () => Promise<Users[]>
    findByEmail: (email: string) => Promise<Users | null>
    findById: (id: string) => Promise<Users | null>
    create: ({name, email, password}: IUsersCreate) => Promise<string>
    update: (id: string, {name, password, avatar_url}: Omit<IUsersUpdate, 'old_password'>) => Promise<void>
}