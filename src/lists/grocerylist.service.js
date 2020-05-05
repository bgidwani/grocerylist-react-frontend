import * as utils from '../utils';
import AuthService from '../auth/auth.service';

class GroceryListService {
    getAll() {
        return utils.request
            .get('list', AuthService.getToken())
            .then((response) => {
                return response.data.data;
            });
    }
}

export default new GroceryListService();
