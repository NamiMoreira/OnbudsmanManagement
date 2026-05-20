import { verify } from 'jsonwebtoken';
import { Request,Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";
import { SaveNewPasswordService } from "../../services/user/SaveNewPasswordService";


class SaveNewPasswordController {

    async handle(req:Request, res:Response){
        const {password} = req.body
        const authHeader = req.headers.authorization;

        const token = authHeader?.split(' ')[1];
        const getUserService = new GetUserService()
        
        try {
            const decoded = verify(
                token,
                process.env.JWT_SECRET
            );
            const decode = await getUserService.executeToken(token)

            if (decode) { 
                const saveNewPasswordService = new SaveNewPasswordService()
                const status = saveNewPasswordService.execute(decode.email,password )
                if (status) {
                    res.status(200).send("Alterado com sucesso!")
                }else{
                    res.status(500).send("Falha ao salvar a nova senha!")
                }
           
            }

            } catch (err) {
            console.log('Token inválido');
            res.status(500).send("Falha ao salvar a nova senha!")
            }
     
        

    }


}

export {SaveNewPasswordController}