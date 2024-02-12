import { Request, Response, Router } from 'express';
import { UsersRepository } from '../repositories/UsersRepository';
import { UsersProvider } from '../providers/UsersProvider';
import { UsersController } from '../controllers/UsersController';

const router: Router = Router();

const usersRepository = new UsersRepository();
const usersProvider = new UsersProvider(usersRepository);
const usersController = new UsersController(usersProvider);

router.get('/', async(req: Request, res: Response) => {
    await usersController.index(req,res);
});

router.post('/', async(req: Request, res: Response) => {
    await usersController.store(req,res);
});

export { router as usersRoutes };