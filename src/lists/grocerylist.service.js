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

    list(listid) {
        let authToken = AuthService.getToken();
        let patchroute = `list/${listid}`;

        return {
            subitem: (itemid) => {
                return {
                    update: (field, value) => {
                        const body = {
                            op: 'replace',
                            path: `/items/${itemid}/${field}`,
                            value: value,
                        };
                        return utils.request.patch(
                            patchroute,
                            body,
                            undefined,
                            authToken
                        );
                    },
                    remove: () => {
                        const body = { op: 'remove', path: `/items/${itemid}` };
                        return utils.request.patch(
                            patchroute,
                            body,
                            undefined,
                            authToken
                        );
                    },
                };
            },
            addsubitem: (name, qty) => {
                const body = { op: 'add', path: `/items`, value: name };
                return utils.request.patch(
                    patchroute,
                    body,
                    undefined,
                    authToken
                );
            },
            remove: () => {
                return utils.request
                    .del(patchroute, null, undefined, authToken)
                    .then((response) => {
                        //console.log(`${this.service} - delete`, response.data);
                        return true;
                    })
                    .catch((err) => {
                        //console.log(`${this.service} - delete error`, err);
                        return err.response.statusText;
                    });
            },
        };
    }
}

export default new GroceryListService();
