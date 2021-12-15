class Auth {
    authenticated: boolean;

    constructor(authenticated: boolean ) {
        this.authenticated = authenticated;
    }

    login(cb: () => any) {
        this.authenticated = true;
        cb();
    }

    logout(cb: () => any) {
        this.authenticated = false;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }
}

export default new Auth(false);