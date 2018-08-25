import {
    isNameValid,
    isDateValid,
    isAuthorsValid,
    isDescriptionValid,
    isGenreNamesValid,
    isMangaTypeValid,
    isStatusTypeValid,
} from '../utils/Validation';
import Model from '../utils/Model';
import { db, Image, Genre } from '../../database/database';
import moment from 'moment';

export const MangaType = {
    MANGA: 0,
    MANHWA: 1,
    MANHUA: 2,
    COMIC: 3,
};

export const StatusType = {
    ISGOING: 0,
    COMPLETED: 1,
    DROP: 2,
};

class Manga extends Model {
    /**
     * @param {import('../interface/manga').Input} input
     */
    static isInputValid(input) {
        isNameValid(input.name);
        isNameValid(input.associatedNames);
        isMangaTypeValid(input.type);
        isStatusTypeValid(input.status);
        isDateValid(input.publishedFrom);
        isDateValid(input.publishedTo);
        isAuthorsValid(input.authors);
        isDescriptionValid(input.description);
    }

    /**
     * @param {import('../interface/manga').Input} input
     */
    static async create(input) {
        Manga.isInputValid(input);
        return await Manga.write({
            id: Manga.nextId,
            name: input.name,
            associatedNames: input.associatedNames,
            type: input.type,
            status: input.status,
            publishedFrom: input.publishedFrom,
            publishedTo: input.publishedTo,
            genres: input.genres,
            authors: input.authors,
            description: input.description,
            image: Image.getById(input.imageId),
        });
    }

    /**
     * @param {import('../interface/manga').Input} input
     */
    async update(input) {
        db.realm.write(() => {
            if (input.hasOwnProperty('name')) {
                isNameValid(input.name);
                this.name = input.name;
            }
            if (input.hasOwnProperty('associatedNames')) {
                isNameValid(input.associatedNames);
                this.associatedNames = input.associatedNames;
            }
            if (input.hasOwnProperty('type')) {
                isMangaTypeValid(input.type);
                this.type = input.type;
            }
            if (input.hasOwnProperty('status')) {
                isStatusTypeValid(input.status);
                this.status = input.status;
            }
            if (input.hasOwnProperty('publishedFrom')) {
                const publishedFrom = moment(input.publishedFrom, 'DD-MM-YYYY').toDate();
                isDateValid(publishedFrom);
                this.publishedFrom = publishedFrom;
            }
            if (input.hasOwnProperty('publishedTo')) {
                const publishedTo = moment(input.publishedTo, 'DD-MM-YYYY').toDate();
                isDateValid(publishedTo);
                this.publishedTo = publishedTo;
            }
            if (input.hasOwnProperty('genres')) {
                isGenreNamesValid(input.genreNames);
                this.genres = input.genreNames.map(genreName =>
                    Genre.getByName(genreName),
                );
            }
            if (input.hasOwnProperty('authors')) {
                isAuthorsValid(input.authors);
                this.authors = input.authors;
            }
            if (input.hasOwnProperty('description')) {
                isDescriptionValid(input.description);
                this.description = input.description;
            }
            if (input.hasOwnProperty('image')) {
                Image.isIdValid(input.imageId);
                this.image = Image.getById(input.imageId);
            }
        });
    }

    async delete() {
        db.realm.delete(this);
    }
}

Manga.schema = {
    name: 'Manga',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        associatedNames: 'string[]',
        type: 'int',
        status: 'int',
        publishedFrom: 'date',
        publishedTo: 'date',
        genres: 'Genre[]',
        authors: 'string',
        description: 'string',
        image: 'Image',
        chapters: {
            type: 'linkingObjects',
            objectType: 'Chapter',
            property: 'manga',
        },
    },
};

export default Manga;
