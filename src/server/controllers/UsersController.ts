import { Request, Response } from 'express';
import { UsersProvider } from '../providers/UsersProvider';
import { IUsersCreate } from '../interfaces/UsersInterfaces';

class UsersController {

    private provider: UsersProvider;

    constructor(provider: UsersProvider) {
        this.provider = provider;
    }

    public async index(req: Request, res: Response){
        // busca todos os usuários
        const result = await this.provider.findAll();

        return res.status(200).json(result);
    }

    public async store(req: Request<{}, {}, IUsersCreate>, res: Response) {
        // cria um usuário
        const { name, email, password } = req.body;

        const result = await this.provider.create({name, email, password});

        return res.status(201).json(result);
    }

}

export { UsersController };