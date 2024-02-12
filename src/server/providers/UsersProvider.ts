import { AppError } from '../errors/AppError';
import { IUsersCreate, IUsersRepository } from '../interfaces/UsersInterfaces';
import { hash } from '../services/encryptPasswordService';


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
}

export { UsersProvider};