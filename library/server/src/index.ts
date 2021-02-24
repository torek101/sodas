import * as express from 'express';

import { createUser } from './controllers/user';
import { userRouter} from './routers/user';

const PORT = 3000;

const app = express();

app.use(express.json());

app.use('/api/user', userRouter);

app.listen(PORT, async () => {
    console.log(`Ready to recieve connections on port ${PORT}!`);

    console.log(await createUser('Henry', 'Feuerborn', 'hfireborn@gmail.com', 'hello'))
});
