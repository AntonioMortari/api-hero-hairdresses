import { PORT } from './config';
import {server} from './server';

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));