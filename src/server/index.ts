import 'express-async-errors';
import express, { Application } from 'express';
import { errorMiddleware } from './middlewares/error';

import { usersRoutes } from './routes/users';


const server: Application = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));

// routes
server.use('/users', usersRoutes);

server.use(errorMiddleware);
export { server };