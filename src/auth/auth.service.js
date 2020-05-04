import axios from 'axios';
import authData from './auth.data';

const API_URL = 'http://localhost:3050/';

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + 'users/login', {
                email,
                password,
            })
            .then((response) => {
                //console.log(response);
                if (response.data.accessToken) {
                    authData.storeUser(response.data);
                }

                return response.data;
            });
    }

    getCurrentUser() {
        return authData.getUser();
    }

    isAuthenticated() {
        const currUser = this.getCurrentUser();
        return (currUser && currUser !== '');
    }
}

export default new AuthService();
