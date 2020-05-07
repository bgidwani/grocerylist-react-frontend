import * as utils from '../utils';
import AuthService from '../auth/auth.service';

class GroceryListService {
    service = 'Grocery List Service';

    getAll() {
        return utils.request
            .get('list', AuthService.getToken())
            .then((response) => {
                return response.data.data;
            });
    }

    create(listname) {
        return utils.request
            .post('list', { name: listname }, undefined, AuthService.getToken())
            .then((response) => {
                console.log(`${this.service} - create`, response.data);
            });
    }

    remove(listid) {
        return utils.request
            .del(`list/${listid}`, null, undefined, AuthService.getToken())
            .then((response) => {
                console.log(`${this.service} - delete`, response.data);
                return true;
            })
            .catch((err) => {
                console.log(`${this.service} - delete error`, err);
                return err.response.statusText;
            });
    }
}

export default new GroceryListService();
