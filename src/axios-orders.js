import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-5fa8f-default-rtdb.firebaseio.com'
});

export default instance;