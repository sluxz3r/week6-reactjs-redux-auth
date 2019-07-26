import axios from 'axios';

export const getUser = () => {
    return {
        type: 'GET_USER',
        payload: axios.get('http://localhost:6969/user/',
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
        payload: axios.get(`http://localhost:6969/user/${userid}`,
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
        payload: axios.delete(`http://localhost:6969/member/${userid}`,
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
        payload: axios.post(`http://localhost:6969/register`, data)
     
    }
};


export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://localhost:6969/login`, data, {
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
        payload: axios.patch(`http://localhost:6969/token/${userid}`)
     
    }
};
