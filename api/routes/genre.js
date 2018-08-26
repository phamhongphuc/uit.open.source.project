import Router from 'koa-router';
import { Genre } from '../../server/database/database';

const router = new Router();

router.post('/api/genre/create', async ctx => {
    const genre = await Genre.create(ctx.request.body);
    ctx.body = { name: genre.name, description: genre.description };
});

router.post('/api/genre/update', async ctx => {
    const req = ctx.request.body;
    const oldGenre = Genre.getByName(req.name);
    if (oldGenre === undefined) {
        throw 'Thể loại này chưa được tạo';
    }
    const genre = await oldGenre.update(req);
    ctx.body = { name: genre.name, description: genre.description };
});

router.post('/api/genre/delete', async ctx => {
    const genre = Genre.getByName(ctx.request.body.name);
    if (genre === undefined) {
        throw 'Thể loại này chưa được tạo';
    }
    await genre.delete();
    ctx.body = { status: 'success' };
});

export default router;
