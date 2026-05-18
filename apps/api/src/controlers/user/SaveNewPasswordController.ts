import { Request,Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";


class SaveNewPasswordController {

    async handle(req:Request, res:Response){
        const {password} = req.body
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(' ')[1];
        const getUserService = new GetUserService()
        const email = getUserService.execute('token',token)
        

        return res.status(200)
        

    }


}

export {SaveNewPasswordController}