export interface UserCreateService {
    fullname: string;
    email: string;
    password: string;
}

export interface UserInserting {
    fullname: string;
    email: string;
    password_hash: string;
}

