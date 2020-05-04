class Auth {
    getUser() {
        return localStorage.getItem('user');
    }

    storeUser(user) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    remove() {
        localStorage.removeItem('user');
    }
}

export default new Auth();
