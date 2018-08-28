import FormData from 'form-data';
import axios from 'axios';

const headers = {
    Authorization: 'Client-ID b8af940ab55eebc',
};

export const uploadImage = async imageBuffer => {
    const data = new FormData();
    data.append('image', imageBuffer);
    return await axios.post('https://api.imgur.com/3/image', data, {
        headers: {
            ...data.getHeaders(),
            ...headers,
        },
    });
};

export const deleteImage = deletehash => {
    return axios.delete(`https://api.imgur.com/3/image/${deletehash}`, {
        headers,
    });
};
