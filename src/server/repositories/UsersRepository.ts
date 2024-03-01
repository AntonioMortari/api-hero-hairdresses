import { Users } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IUsersCreate, IUsersRepository, IUsersUpdate } from '../interfaces/UsersInterfaces';


class UsersRepository implements IUsersRepository {

    public async findAll(): Promise<Users[]> {
        return await prisma.users.findMany();
    }

    public async findByEmail(email: string): Promise<Users | null> {
        return await prisma.users.findUnique({
            where: {
                email
            }
        });
    }

    public async findById(id: string): Promise<Users | null> {
        return await prisma.users.findUnique({
            where: {
                id
            }
        });
    }

    public async create({ name, email, password }: IUsersCreate): Promise<string> {
        const user = await prisma.users.create({
            data: {
                name,
                email,
                password
            }
        });

        return user.id;
    }

    public async update(
        id: string,
        { name, password, email, avatar_url }: Omit<IUsersUpdate, 'old_password'>
    ): Promise<void> {
        await prisma.users.update({
            where: {
                id
            },
            data: {
                name,
                email,
                password,
                avatar_url
            }
        });
    }

}

export { UsersRepository };