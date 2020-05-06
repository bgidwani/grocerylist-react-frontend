import * as utils from '../utils';
import AuthService from '../auth/auth.service';

class GroceryListService {
    getAll() {
        return utils.request
            .get('list', AuthService.getToken())
            .then((response) => {
                return response.data.data;
            })
            .catch((err) => {
                console.log(err.message);
                return [];
            });
    }

    create(listname) {
        return utils.request
            .post('list', { name: listname }, undefined, AuthService.getToken())
            .then((response) => {
                console.log(response.data);
            })
            .catch((err) => {
                console.log('Error saving new list', err);
            });
    }
}

export default new GroceryListService();
