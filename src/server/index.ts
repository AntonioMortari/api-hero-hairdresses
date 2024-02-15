import 'express-async-errors';
import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/error';

import { usersRoutes } from './routes/users';
import { schedulesRoutes } from './routes/schedules';

const server: Application = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/users', usersRoutes);
server.use('/schedules', schedulesRoutes);

server.use(errorMiddleware);
export { server };