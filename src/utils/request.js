import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const generateUrl = (relativePath) => {
    return `${API_URL}/${relativePath}`;
};

const createOptions = (httpmethod, url, requestBody, contentType, token) => {
    let options = {
        method: httpmethod,
        url: url,
        data: requestBody,
        headers: {
            'content-type': 'application/json',
            Authorization: '',
        },
    };

    if (contentType) {
        options.headers['content-type'] = contentType;
    }

    if (token) {
        options.headers.Authorization = token;
    }

    return options;
};

const requestPath = (httpmethod, relativePath, body, contentType, token) => {
    let url = generateUrl(relativePath);

    return axios.request(
        createOptions(httpmethod, url, body, contentType, token)
    );
};

const get = (relativePath, token) => {
    // console.log('Inside get', token);
    return requestPath('GET', relativePath, {}, undefined, token);
};

const post = (relativePath, body, contentType, token) => {
    return requestPath('POST', relativePath, body, contentType, token);
};

const patch = (relativePath, body, contentType, token) => {
    return requestPath('PATCH', relativePath, body, contentType, token);
};

const del = (relativePath, body, contentType, token) => {
    return requestPath('DELETE', relativePath, body, contentType, token);
};

export { get, post, patch, del };
