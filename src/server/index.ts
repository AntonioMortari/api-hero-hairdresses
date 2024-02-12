import express, { Application } from 'express';

const server: Application = express();

server.use(express.json());
server.use(express.urlencoded({extended: true}));

export { server};