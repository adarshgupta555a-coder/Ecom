import { type Response, type Request } from "express"
import { userCreate, usersAll } from "../services/user.service.js"
import { ApiError, ApiResponse } from "../utils/api-req-res.js"


const users = async (req: Request, res: Response) => {
    try {
        const Data = await usersAll()
        res.status(200).send(Data)

    } catch (error) {
        console.log(error);
    }
}

const userRegister = async (req: Request, res: Response) => {
    try {
        const { fullname, email, password } = await req.body;

        if (fullname == "" && email == "" && password == "") {
            return res.json({ message: "invalid data" })
        }

        const userInsert = await userCreate({ fullname, email, password });

        res.json({
            message: "data is inerted",
            data: userInsert
        })



    } catch (error) {
        console.log(error)
    }
}


export { users, userRegister }