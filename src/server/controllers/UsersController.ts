import { Request, Response } from 'express';
import { UsersProvider } from '../providers/UsersProvider';
import { IUsersCreate } from '../interfaces/UsersInterfaces';

class UsersController {

    private provider: UsersProvider;

    constructor(provider: UsersProvider) {
        this.provider = provider;
    }

    public async index(req: Request, res: Response) {
        // busca todos os usuários
        const result = await this.provider.findAll();

        return res.status(200).json(result);
    }

    public async show(req: Request, res: Response) {
        const { id } = req.params;

        const result = await this.provider.findById(id);

        return res.status(200).json(result);
    }

    public async store(req: Request<{}, {}, IUsersCreate>, res: Response) {
        // cria um usuário
        const { name, email, password } = req.body;

        const result = await this.provider.create({ name, email, password });

        return res.status(201).json(result);
    }

    public async edit(req: Request, res: Response) {


        const { id } = req.params;
        const { name, password, email, old_password } = req.body;

        await this.provider.update(id, {
            name,
            email,
            old_password,
            password,
            avatar_url: req.file?.filename || '' 
        });

        return res.status(204).send();
    }

    public async auth(req: Request, res: Response) {
        const { email, password } = req.body;
        const result = await this.provider.auth(email, password);

        return res.status(200).json(result);
    }

    public async refresh(req: Request, res: Response) {
        const { refresh_token } = req.body;

        const result = await this.provider.refresh(refresh_token);

        return res.status(200).json({
            token: result
        });
    }

}

export { UsersController };