import prismaClient from "../../prisma";
import { hash } from "bcryptjs";



class SaveNewPasswordService{
    async execute(email,password){
    const passwordHash = await hash(password, 8);
    const result = await prismaClient.user.update({
            data: {
                password: passwordHash
            },
            where: {
                email: email
            }
        })
           
        if (result) {
            return true
        } else {
            return false
        }
    }
}

export {SaveNewPasswordService}