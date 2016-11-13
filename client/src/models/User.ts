export default class User {   
    realm: string;
    username: string;
    email: string;
    emailVerified: boolean;
    id: number;
}

export class UserIonic extends User {
    token: string;
    sessionId: string;
    password: string;
    ttl: string;
    createdOn: string;
}