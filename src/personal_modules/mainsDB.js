import DB from "./DB";

export class publicDB extends DB {
    static apiPrefix = `/api/public`;
    static localPrefix = `public_`;
}
export class authDB extends DB {
    static apiPrefix = `/api/auth`;
    static localPrefix = `auth_`;
    static addAuthorization = true;
}

export class userDB extends DB {
    static apiPrefix = `/api/auth/user`;
    static addUserId = true;
    static localPrefix = `user_`;
    static addAuthorization = true;
}
