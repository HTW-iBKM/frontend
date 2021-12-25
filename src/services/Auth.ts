class Auth {

    user: {
        email: string;
        family_name: string;
        name: string;
    } | undefined;
    // authenticated: boolean;

    // constructor(authenticated: boolean) {
    //     this.authenticated = authenticated;
    // }

    login(data: any, cb: () => void) {
        this.user = data.idToken.payload;
        localStorage.setItem("user", JSON.stringify(this.user))
        cb();
    }

    logout(cb: () => void) {
        localStorage.removeItem("user");
        cb();
    }

    isAuthenticated() {
        return this.user;
    }
}

export default new Auth();