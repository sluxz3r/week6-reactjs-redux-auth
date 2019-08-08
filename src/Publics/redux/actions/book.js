import axios from 'axios';
const url = 'https://lib-books-test.herokuapp.com';

export const getBooks = () => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${url}`),

    }
};

export const getPagination = (page) => {
    return {
        type: 'GET_BOOKS',
        payload: axios.get(`${url}/cek/get?page=${page}`,
            {
                headers: {
                    "authorization": "x-control-user",
                    "x-access-token": `token: ${localStorage.jwtToken}`,
                    "x-control-user": localStorage.userid
                }
            }),

    }
};

export const getBook = (bookid) => {
    return {
        type: 'GET_BOOK', bookid,
        payload: axios.get(`${url}/${bookid}`)
    }

};

export const postBook = (data) => {
    return {
        type: 'POST_BOOK',
        payload: axios.post(`${url}/`, data)
    }

};

export const deleteBook = (bookid) => {
    return {
        type: 'DELETE_BOOK', bookid,
        payload: axios.delete(`${url}/${bookid}`)
    }

};

export const addBook = (data) => {
    return {
        type: 'ADD_BOOK', data,
        payload: axios.post(`${url}/`, data)
    }
};

export const updateBook = (data, bookid) => {
    return {
        type: 'UPDATE_BOOK',
        payload: axios.patch(`${url}/${bookid}`, data),
    }
};