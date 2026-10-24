export interface UserCreateService {
    fullname: string;
    email: string;
    password: string;
    phone: string;
}

export interface UserInserting {
    fullname: string;
    email: string;
    password_hash: string;
    phone: string;
}

export interface RegisterUserInput {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    address: string;
    city_id: number;
    pincode: string;
}

