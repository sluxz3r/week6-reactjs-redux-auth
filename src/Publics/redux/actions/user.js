import axios from 'axios';

const url = 'https://sluxzer-library.herokuapp.com';

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get(`${url}`,
            {
                headers: {
                    "authorization": "x-control-user",
                    "x-access-token": `token: ${localStorage.jwtToken}`,
                    "x-control-user": localStorage.userid
                }
            }),

    }
};

export const getUserId = (userid) => {
    return {
        type: 'GET_USERID',
        payload: axios.get(`${url}/user/${userid}`,
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

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`${url}/register`, data)
     
    }
};


export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`${url}/login`, data, {
            headers: {
                "authorization": "x-control-user",
            }
        }).then( res => {
            const token = res.data.result.token;
            const userid = res.data.result.userid;
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userid', userid);
        })
    }

};

export const logout = (userid) => {
    return {
        type: 'LOGOUT', userid,
        payload: axios.patch(`${url}/token/${userid}`)
     
    }
};
