import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://testproject-4cd3c.firebaseio.com/'
});

export default instance;