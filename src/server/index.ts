import 'express-async-errors';
import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/error';
import {errors} from 'celebrate';
import cors from 'cors';
import path from 'path';

import { usersRoutes } from './routes/users';
import { schedulesRoutes } from './routes/schedules';

const server: Application = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/files', express.static(path.resolve(__dirname, '..', '..', 'public', 'uploads')));
server.use(cors());

// routes
server.use('/users', usersRoutes);
server.use('/schedules', schedulesRoutes);

server.use(errors());
server.use(errorMiddleware);
export { server };