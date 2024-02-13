import { AppError } from '../errors/AppError';
import { IUsersCreate, IUsersRepository, IUsersUpdate } from '../interfaces/UsersInterfaces';
import { compare, hash } from '../services/encryptPasswordService';


class UsersProvider{

    private repository: IUsersRepository;

    constructor(repository: IUsersRepository){
        this.repository = repository;
    }

    public async findAll(){
        return await this.repository.findAll();
    }
    
    public async create({name, email, password}: IUsersCreate){
        const findUser = await this.repository.findByEmail(email);
        if(findUser){
            throw new AppError(`User with mail ${email} exists`, 400);
        }

        return await this.repository.create({
            name,
            email,
            password: await hash(password)
        });
    }

    public async update(id: string, {name, old_password, password, avatar_url}: IUsersUpdate){
        if(!old_password){
            throw new AppError('Old password is required', 400);
        }

        const findUser = await this.repository.findById(id);
        if(!findUser){
            throw new AppError(`User with id ${id} not exists`, 400);
        }

        if(!await compare(old_password, findUser.password)){
            throw new AppError('Invalid Credentials', 400);
        }

        await this.repository.update(id, {
            name,
            avatar_url,
            password: await hash(password)
        });
    }
}

export { UsersProvider};