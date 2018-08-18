import koa from 'koa';
import cors from '@koa/cors';

import users from './routes/users';

const app = new koa();

app.use(
    cors({
        origin: 'http://localhost:8080',
    }),
);

app.use(users.routes());

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000!');
});
