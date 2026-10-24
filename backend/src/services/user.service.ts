import { prisma } from "../lib/prisma.js";
import type { UserCreateService, RegisterUserInput } from "../types/auth.js";
import bcrypt from "bcryptjs"



// #endregion


// #region GetAllUsers
export const usersAll = async () => {
    try {
        const Allusers = await prisma.user.findMany({
            take: 100
        });
        return Allusers;
    } catch (error) {
        console.log(error);
    }
}
// #endregion

// #region CreateUser
export const registerUser = async (input: RegisterUserInput) => {
    // Hash password before opening transaction
    const password_hash = await bcrypt.hash(input.password, 12);

    const result = await prisma.$transaction(async (tx) => {

        // Step 1: Create user
        const user = await tx.user.create({
            data: {
                fullname: input.fullname,
                email: input.email,
                phone: input.phone,
                password_hash,
            },
            select: {
                id: true,
                fullname: true,
                email: true,
                phone: true,
            },
        });

        // Step 2: Create address using generated user ID
        const userAddress = await tx.userAddress.create({
            data: {
                user_id: user.id,
                address: input.address,
                city_id: input.city_id,
                pincode: input.pincode,
            },
        });

        // Step 3: Set user's default address
        await tx.user.update({
            where: {
                id: user.id,
            },
            data: {
                address_id: userAddress.id,
            },
        });

        return {
            user: {
                ...user,
                address_id: userAddress.id,
            },
            address: userAddress,
        };
    });

    return result;
};


export const AddCountry = async (input: string) => {
    try {
        const result = await prisma.country.create({
            data:{
                name: input
            }
        });

        return result;
    } catch (error) {
        console.log(error)
    }
}

// export const AddCity = async (input: string) => {
//     try {
//         const result = await prisma.city.create({
//             data:{
//                 name: input
//             }
//         });

//         return result;
//     } catch (error) {
//         console.log(error)
//     }
// }


// #endregion
