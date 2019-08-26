import Axios from 'axios';

const axios = Axios.create({
  baseURL: process.env.apiBase,
  validateStatus: function(status) {
    return (status >= 200 && status < 300) || status === 401;
  },
});

export default axios;
