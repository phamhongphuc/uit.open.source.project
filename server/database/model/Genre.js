import { isNameValid, isDescriptionValid } from '../utils/Validation';
import Model from '../utils/Model';
import { db } from '../../database/database';

class Genre extends Model {
    /**
     * @param {String} name
     * @returns {Genre}
     */
    static getByName(name) {
        return this.list.filtered('name LIKE $0', name)[0];
    }

    /**
     * @param {import('../interface/genre').Input} input
     */
    static isRawValid(input) {
        isNameValid(input.name);
        isDescriptionValid(input.desciption);
    }

    /**
     * @param {import('../interface/genre').Input} input
     */
    static async create(input) {
        Genre.isRawValid(input);
        if (Genre.getByName(input.name) !== undefined) {
            throw 'Thể loại này đã được tạo';
        }
        return await Genre.write({
            name: input.name,
            description: input.desciption,
        });
    }

    //vì name là khóa chính nên không thể sửa
    async update(input) {
        db.realm.write(() => {
            if (input.hasOwnProperty('description')) {
                isDescriptionValid(input.description);
                this.description = input.description;
            }
        });
    }

    async delete() {
        db.realm.delete(this);
    }
}

Genre.schema = {
    name: 'Genre',
    primaryKey: 'name',

    properties: {
        name: 'string',
        description: 'string',
        manga: {
            type: 'linkingObjects',
            objectType: 'Manga',
            property: 'genres',
        },
    },
};

export default Genre;
