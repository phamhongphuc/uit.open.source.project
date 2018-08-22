class Image {}

Image.schema = {
    name: 'Image',
    primaryKey: 'id',

    properties: {
        id: 'int',
        name: 'string',
        url: 'string',
        chapter: 'Chapter',
    },
};

export default Image;
