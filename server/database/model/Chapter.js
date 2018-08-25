import { isNameValid } from '../utils/Validation';
import Model from '../utils/Model';
import { db, Manga } from '../../database/database';

class Chapter extends Model {
    /**
     * @param {import('../interface/chapter').Input} input
     */
    static async create(input) {
        return await Chapter.write({
            id: Chapter.nextId,
            date: new Date(),
            manga: Manga.getById(input.mangaId),
            isPublished: false,
        });
    }

    async update(input) {
        db.realm.write(() => {
            if (input.hasOwnProperty('name')) {
                isNameValid(input.name);
                this.name = input.name;
            }
            this.isPublished = true;
        });
    }

    async delete() {
        db.realm.delete(this);
    }
}

Chapter.schema = {
    name: 'Chapter',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        date: 'date',
        manga: 'Manga',
        isPublished: 'bool',
        images: {
            type: 'linkingObjects',
            objectType: 'Image',
            property: 'chapter',
        },
    },
};

export default Chapter;
