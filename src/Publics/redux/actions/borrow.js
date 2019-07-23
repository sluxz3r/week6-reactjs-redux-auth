import axios from 'axios';

export const getBorrows = (bookid) => {
  return {
      type: 'GET_BORROW',
      payload: axios.get(`http://localhost:6969/lah/${bookid}`,
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
        payload :axios.post(`http://localhost:6969/borrow`,data,
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
      payload: axios.patch(`http://localhost:6969/borrow/${bookid}`,data,
      {
        headers: {
            "authorization": "x-control-user",
            "x-access-token": `token: ${localStorage.jwtToken}`,
            "x-control-user": localStorage.userid
        }
      }),
    }
  };
