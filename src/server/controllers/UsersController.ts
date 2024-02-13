import { Request, Response } from 'express';
import { UsersProvider } from '../providers/UsersProvider';
import { IUsersCreate } from '../interfaces/UsersInterfaces';
import { AppError } from '../errors/AppError';

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

    public async edit(req: Request, res: Response){
        if(!req.file){
            throw new AppError('File is required', 400);
        }

        const {id} = req.params;
        const { name,password,old_password} = req.body;

        console.log(name);

        await this.provider.update(id, {
            name,
            old_password,
            password,
            avatar_url: req.file.filename
        });

        return res.status(204).send();
    }

}

export { UsersController };