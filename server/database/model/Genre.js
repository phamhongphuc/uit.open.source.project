class Genre {}

Genre.schema = {
    name: 'Genre',
    primaryKey: 'id',

    properties: {
        id: 'int',
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
