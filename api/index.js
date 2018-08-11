import express from 'express';
import users from './routes/users';

const app = express();

app.use(users);

export default {
    path: '/api',
    handler: app,
};
