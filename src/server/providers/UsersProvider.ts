import { AppError } from '../errors/AppError';
import { IUsersCreate, IUsersRepository, IUsersUpdate } from '../interfaces/UsersInterfaces';
import { compare, hash } from '../services/encryptPasswordService';
import * as jwtService from '../services/jwtService';


class UsersProvider {

    private repository: IUsersRepository;

    constructor(repository: IUsersRepository) {
        this.repository = repository;
    }

    public async findAll() {
        return await this.repository.findAll();
    }

    public async findById(id: string) {
        const findUser = await this.repository.findById(id);

        if (!findUser) {
            throw new AppError(`User with id ${id} not exists`, 400);
        }

        return findUser;
    }

    public async create({ name, email, password }: IUsersCreate) {
        const findUser = await this.repository.findByEmail(email);
        if (findUser) {
            throw new AppError(`User with mail ${email} exists`, 400);
        }

        return await this.repository.create({
            name,
            email,
            password: await hash(password)
        });
    }

    public async update(id: string, { name, old_password, password, avatar_url }: IUsersUpdate) {
        if (!old_password) {
            throw new AppError('Old password is required', 400);
        }

        const findUser = await this.repository.findById(id);
        if (!findUser) {
            throw new AppError(`User with id ${id} not exists`, 400);
        }

        if (!await compare(old_password, findUser.password)) {
            throw new AppError('Invalid Credentials', 400);
        }

        await this.repository.update(id, {
            name,
            avatar_url,
            password: await hash(password)
        });
    }

    public async auth(email: string, password: string) {
        const findUser = await this.repository.findByEmail(email);
        if (!findUser) {
            throw new AppError('Email or password incorrect', 401);
        }

        if (!await compare(password, findUser.password)) {
            throw new AppError('Email or password incorrect', 401);
        }

        return {
            token: jwtService.sign({ sub: findUser.id, expiresIn: '1h' }),
            refresh_token: jwtService.sign({sub: findUser.id, expiresIn: '7d'}),
            user: {
                name: findUser.name,
                email: findUser.email
            }
        };
    }

    public async refresh(refresh_token: string) {
        if (!refresh_token) {
            throw new AppError('Refresh token is required', 400);
        }

        const sub = jwtService.verify(refresh_token);


        return jwtService.sign({sub, expiresIn: '1h'});
    }
}

export { UsersProvider };