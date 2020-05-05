import authData from './auth.data';
import * as utils from '../utils';

class AuthService {
    login(email, password) {
        return utils.request
            .post('users/login', {
                email,
                password,
            })
            .then((response) => {
                //console.log(response.data.data);
                if (response.data.data.token) {
                    authData.storeUser(response.data.data);
                }

                return response.data;
            });
    }

    getCurrentUser() {
        return authData.getUser();
    }

    isAuthenticated() {
        const currUser = this.getCurrentUser();
        return currUser && currUser !== '';
    }

    getToken() {
        if (this.isAuthenticated()) {
            let user = this.getCurrentUser();
            return user.token;
        }

        return null;
    }

    logout() {
        authData.remove();
    }
}

export default new AuthService();
