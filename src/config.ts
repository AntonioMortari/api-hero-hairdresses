import 'dotenv/config';

const PORT = Number(process.env.PORT) || 3000;
const JWT_SECRET = process.env.JWT_SECRET;

export { PORT,JWT_SECRET };