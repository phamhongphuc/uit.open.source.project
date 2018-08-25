import { isNameValid, isUrlValid } from '../utils/Validation';
import Model from '../utils/Model';
import { db, Chapter } from '../../database/database';

class Image extends Model {
    /**
     * @param {import('../interface/image').Input} input
     */
    static isRawValid(image) {
        isNameValid(image.name);
        isUrlValid(image.url);
    }

    /**
     * @param {import('../interface/image').Input} input
     */
    static async create(input) {
        Image.isRawValid(input);
        return await Image.write({
            id: Image.nextId,
            name: input.name,
            url: input.url,
            chapter: Chapter.getById(input.chapterId),
        });
    }

    async delete() {
        db.realm.delete(this);
    }
}

Image.schema = {
    name: 'Image',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        url: 'string',
        chapter: 'Chapter',
        manga: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'image',
        },
    },
};

export default Image;
