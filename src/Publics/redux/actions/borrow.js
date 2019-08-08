import axios from 'axios';
const url = 'http://aingcreation.com';

export const getBorrows = (bookid) => {
  return {
      type: 'GET_BORROW',
      payload: axios.get(`${url}/lah/${bookid}`,
      {
        headers: {
            "authorization": "x-control-user",
            "x-access-token": `token: ${localStorage.jwtToken}`,
            "x-control-user": localStorage.userid
        }
      })
  }
}

export const userBorrows = (user_ktp) => {
  return {
      type: 'USER_BORROW',
      payload: axios.get(`${url}/lah/user/${user_ktp}`,
      {
        headers: {
            "authorization": "x-control-user",
            "x-access-token": `token: ${localStorage.jwtToken}`,
            "x-control-user": localStorage.userid
        }
      })
  }
}

export const postBorrow = (data) =>{
    return {
        type:'POST_BORROW',
        payload :axios.post(`${url}/borrow`,data,
        {
          headers: {
              "authorization": "x-control-user",
              "x-access-token": `token: ${localStorage.jwtToken}`,
              "x-control-user": localStorage.userid
          }
        })
    }
}

export const updateBorrow = (data, bookid) => {
    return {
      type: 'UPDATE_BORROW',
      payload: axios.patch(`${url}/borrow/${bookid}`,data,
      {
        headers: {
            "authorization": "x-control-user",
            "x-access-token": `token: ${localStorage.jwtToken}`,
            "x-control-user": localStorage.userid
        }
      }),
    }
  };
