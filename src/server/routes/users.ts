import { Request, Response, Router } from 'express';
import { UsersRepository } from '../repositories/UsersRepository';
import { UsersProvider } from '../providers/UsersProvider';
import { UsersController } from '../controllers/UsersController';
import { upload } from '../middlewares/upload';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { authValidation, editValidation, storeValidation } from '../validations/users';

const router: Router = Router();

const usersRepository = new UsersRepository();
const usersProvider = new UsersProvider(usersRepository);
const usersController = new UsersController(usersProvider);

router.get('/', isAuthenticated, async (req: Request, res: Response) => {
    await usersController.index(req, res);
});

router.get('/:id', isAuthenticated, async (req: Request, res: Response) => {
    await usersController.show(req, res);
});

router.post('/', storeValidation, async (req: Request, res: Response) => {
    await usersController.store(req, res);
});

router.post('/auth', authValidation, async (req: Request, res: Response) => {
    await usersController.auth(req, res);
});

router.post('/refresh', async(req: Request, res: Response) => {
    await usersController.refresh(req,res);
});

router.put('/:id', editValidation, isAuthenticated, upload.single('file'), async (req: Request, res: Response) => {
    await usersController.edit(req, res);
});

export { router as usersRoutes };