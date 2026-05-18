import { Request, Response } from "express";
import {CreateUserService} from "../../services/user/CreateUserService"

class CreateUserController {
    async handle(req: Request, res: Response){
        var { name, email, password, role ,sector } = req.body;
        role = parseInt(role)
        sector = parseInt(sector)
        if (!name || !email || !password || !role || !sector) {
            res.status(400).send('Missing data for user creation!')        }
console.log(req.body);

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password, role,sector});
        
        if (!user) {
            return res.status(400).send( "Falha ao criar o usuário!")
        }
        if (user.logError ===1) {
            return res.status(user.status).send(user.error)
        }
        if (user) {
            
        }

         return res.json(user);
        
    }
}

export {CreateUserController};