import Router from 'koa-router';
import { db } from '../../database/database';
import { Manga } from '../../database/model';

const router = new Router();

router
    .get('/api/mangas', async ctx => {
        // get 1 danh sách truyện
        const mangas = db.realm.objects('Manga');
        ctx.body = mangas.map(manga => ({
            id: manga.id,
            name: manga.name,
            genres: manga.genres.map(genre => genre.name),
            description: manga.description,
            imageId: manga.image.id,
        }));
    })
    .get('/api/manga/:id', async ctx => {
        // get 1 chi tiết truyện
        const manga = Manga.getById(ctx.params.id);
        ctx.body = {
            id: manga.id,
            name: manga.name,
            associatedNames: manga.associatedNames.map(a => a),
            type: manga.type,
            status: manga.status,
            publishedFrom: manga.publishedFrom,
            publishedTo: manga.publishedTo,
            genres: manga.genres.map(genre => genre.name),
            authors: manga.authors,
            description: manga.description,
            imageId: manga.image.id,
            chapter: manga.chapters.map(chapter => ({
                id: chapter.id,
                name: chapter.name,
                date: chapter.date,
            })),
        };
    })
    .post('/api/manga', async ctx => {
        const manga = await Manga.create(ctx.request.body);
        ctx.body = {
            id: manga.id,
            name: manga.name,
            associatedNames: manga.associatedNames.map(a => a),
            type: manga.type,
            status: manga.status,
            publishedFrom: manga.publishedFrom,
            publishedTo: manga.publishedTo,
            genres: manga.genres.map(genre => genre.name),
            authors: manga.authors,
            description: manga.description,
            imageId: manga.image.id,
        };
    })
    .patch('/api/manga/:id', async ctx => {
        const oldManga = Manga.getById(ctx.params.id);
        if (oldManga === undefined) {
            throw new Error('Truyện này chưa được tạo');
        }
        const manga = await oldManga.update(ctx.request.body);
        ctx.body = {
            id: manga.id,
            name: manga.name,
            associatedNames: manga.associatedNames.map(a => a),
            type: manga.type,
            status: manga.status,
            publishedFrom: manga.publishedFrom,
            publishedTo: manga.publishedTo,
            genres: manga.genres.map(genre => genre.name),
            authors: manga.authors,
            description: manga.description,
            imageId: manga.image.id,
        };
    })
    .delete('/api/manga/:id', async ctx => {
        const manga = Manga.getById(ctx.params.id);
        if (manga === undefined) {
            throw new Error('Truyện này chưa được tạo');
        }
        await manga.delete();
        ctx.body = { status: 'success' };
    });

export default router;