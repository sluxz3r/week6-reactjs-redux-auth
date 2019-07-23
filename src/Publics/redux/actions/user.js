import axios from 'axios';

export const register = (data) => {
    return {
        type: 'REGISTER',
        payload: axios.post(`http://localhost:6969/register`, data)
     
    }
};


export const login = (data) => {
    return {
        type: 'LOGIN',
        payload: axios.post(`http://localhost:6969/login`, data).then( res => {
            const token = res.data.result.token;
            const userid = res.data.result.userid;
            const name = res.data.result.fullname;
            const status = res.data.result.status
            localStorage.setItem('jwtToken', token);
            localStorage.setItem('userid', userid);
            localStorage.setItem('name', name);
            localStorage.setItem('status', status);
        })
    }

};