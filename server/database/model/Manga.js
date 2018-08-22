class Manga {}

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
        chapters: {
            type: 'linkingObjects',
            objectType: 'Chapter',
            property: 'manga',
        },
    },
};

export default Manga;
