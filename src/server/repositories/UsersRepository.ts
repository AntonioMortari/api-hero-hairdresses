import { Users } from '@prisma/client';
import { prisma } from '../database/prisma';
import { IUsersCreate, IUsersRepository } from '../interfaces/UsersInterfaces';


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

}

export { UsersRepository };