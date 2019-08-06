import axios from 'axios';

const url = 'https://sluxzer-library.herokuapp.com';

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${url}/user`,
            {
                headers: {
                    "authorization": "x-control-user",
                    "x-access-token": `token: ${localStorage.jwtToken}`,
                    "x-control-user": localStorage.userid
                }
            }),

    }
};

export const deleteMember = (userid) => {
    return {
        type: 'DELETE_USER', userid,
        payload: axios.delete(`${url}/member/${userid}`,
        {
            headers: {
                "authorization": "x-control-user",
                "x-access-token": `token: ${localStorage.jwtToken}`,
                "x-control-user": localStorage.userid
            }
        }),
    }

};


