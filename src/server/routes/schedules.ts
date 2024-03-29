import { Request, Response, Router } from 'express';

import { SchedulesRepository } from '../repositories/SchedulesRepository';
import { SchedulesProvider } from '../providers/SchedulesProvider';
import { SchedulesController } from '../controllers/SchedulesController';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import { destroyValidation, editValidation, indexValidation, storeValidation } from '../validations/schedules';

const router: Router = Router();

const schedulesRepository = new SchedulesRepository();
const schedulesProvider = new SchedulesProvider(schedulesRepository);
const schedulesController = new SchedulesController(schedulesProvider);

router.get('/', indexValidation, isAuthenticated, async (req: Request, res: Response) => {
    await schedulesController.index(req, res);
});

router.post('/', storeValidation, isAuthenticated, async (req: Request, res: Response) => {
    await schedulesController.store(req, res);
});

router.put('/:id', editValidation, isAuthenticated, async (req: Request, res: Response) => {
    await schedulesController.edit(req, res);
});

router.delete('/:id', destroyValidation, isAuthenticated, async (req: Request, res: Response) => {
    await schedulesController.destroy(req, res);
});


export { router as schedulesRoutes };