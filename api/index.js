import koa from 'koa';
import cors from '@koa/cors';

import database from '../server/database/database';
import usersRouter from './routes/users';

(async function() {
    await database();

    const app = new koa();

    app.use(
        cors({
            origin: 'http://localhost:8080',
        }),
    );

    app.use(usersRouter.routes());

    app.listen(process.env.PORT || 3000, () => {
        console.log('Server is running on port 3000!');
    });
})();
