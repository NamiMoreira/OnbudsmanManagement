import { SendEmailController } from "../../controlers/email/SendEmailController";
import prismaClient from "../../prisma";


class SaveTokenService{
    async execute(token,email,expires_at){
            let result = await prismaClient.userRecovery.create({
                data: {
                    token:  token ,
                    user_email: email ,
                    expires_at: expires_at
                }

            })
            if (result) {
                return true
                
            }else{
                return false

            }
        }
}
export{ SaveTokenService}