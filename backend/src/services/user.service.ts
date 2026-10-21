import { prisma } from "../lib/prisma.js";
import type { UserCreateService, UserInserting } from "../types/auth.js";

const usersAll = async () => {
    try {
       const Allusers = await prisma.User.all()
        return Allusers;
    } catch (error) {
        console.log(error);
    }
}

const userCreate = async (userData: UserCreateService) => {
    try {
         const {fullname, email, password} =  userData;
        const usersCreate = await prisma.User.create<UserInserting | any>({
            fullname,
            email,
            password_hash: password,
            address_id: 1,
        })

        return userCreate;
    } catch (error) {
        console.log(error)
    }
}

export {
    usersAll,
    userCreate
}
