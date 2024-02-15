import { Request, Response } from 'express';
import { SchedulesProvider } from '../providers/SchedulesProvider';
import { ISchedulesCreate } from '../interfaces/SchedulesInterfaces';

import { parseISO } from 'date-fns';

class SchedulesController {

    private provider: SchedulesProvider;

    constructor(provider: SchedulesProvider) {
        this.provider = provider;
    }

    public async index(req: Request, res: Response) {

        const { date } = req.query;
        const parseDate = date ? parseISO(date.toString()) : new Date();

        const result = await this.provider.findAll(parseDate);

        return res.status(200).json(result);
    }

    public async store(req: Request<{}, {}, ISchedulesCreate>, res: Response) {
        const { name, phone, date } = req.body;
        const {user_id} = req;

        const result = await this.provider.create({ name, phone, date,user_id });

        return res.status(201).json(result);
    }

    public async edit(req: Request, res: Response) {
        const { id } = req.params;
        const { date } = req.body;
        const {user_id} = req;

        await this.provider.update(id, date, user_id);

        return res.status(204).send();
    }

    public async destroy(req: Request, res: Response) {
        const { id } = req.params;

        await this.provider.delete(id);

        return res.status(204).send();
    }

}

export { SchedulesController };