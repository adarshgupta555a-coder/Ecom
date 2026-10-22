import { type Response, type Request } from "express"
import { AddCountry, registerUser, usersAll } from "../services/user.service.js"
import { ApiError, ApiResponse } from "../utils/api-req-res.js"


export const users = async (req: Request, res: Response) => {
    try {
        const Data = await usersAll()
        res.status(200).send(Data)

    } catch (error) {
        console.log(error);
    }
}

export const userRegister = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password, address, city_id, phone, pincode } = await req.body;

        if (fullname == "" && email == "" && phone == "" && address == "" && city_id == "" && password == "" && pincode == "") {
            return res.json({ message: "invalid data" })
        }

        const userInsert = await registerUser({ fullname, phone,  email, password,  address, city_id, pincode });

        res.json({
            message: "data is inerted",
            data: userInsert
        })



    } catch (error) {
        console.log(error)
    }
}

export const Country = async (req: Request , res: Response) => {
    try {
        const CountryName = req.body.country;
        if (CountryName == "") {
            res.json({
                message: "country name is not defined."
            })
        }
        const NewCountry = await AddCountry(CountryName);

        res.json({
            message: "country name is inserted",
            data: NewCountry
        })
    } catch (error) {
        console.log(error)
    }
}

// export const City = async (req: Request , res: Response) => {
//     try {
//         const CityName = req.body.city;
//         if (CityName == "") {
//             res.json({
//                 message: "city name is not defined."
//             })
//         }
//         const NewCity = await AddCity(CityName);

//         res.json({
//             message: "city name is inserted",
//             data: NewCity
//         })
//     } catch (error) {
//         console.log(error)
//     }
// }