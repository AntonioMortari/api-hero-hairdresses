import { Request, Response, Router } from 'express';

import { SchedulesRepository } from '../repositories/SchedulesRepository';
import { SchedulesProvider } from '../providers/SchedulesProvider';
import { SchedulesController } from '../controllers/SchedulesController';
import {isAuthenticated} from '../middlewares/isAuthenticated';

const router: Router = Router();

const schedulesRepository = new SchedulesRepository();
const schedulesProvider = new SchedulesProvider(schedulesRepository);
const schedulesController = new SchedulesController(schedulesProvider);

router.get('/', isAuthenticated, async(req: Request, res: Response) => {
    await schedulesController.index(req,res);
});

router.post('/', isAuthenticated, async(req: Request, res: Response) => {
    await schedulesController.store(req,res);
});

router.put('/:id', isAuthenticated, async(req: Request, res: Response) => {
    await schedulesController.edit(req,res);
});

router.delete('/:id', isAuthenticated, async(req: Request, res: Response) => {
    await schedulesController.destroy(req,res);
});


export { router as schedulesRoutes };