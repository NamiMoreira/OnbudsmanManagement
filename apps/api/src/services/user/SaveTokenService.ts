import prismaClient from "../../prisma";


class SaveTokenService{
    async execute(token){            
        let result = await prismaClient.userRecovery.create({
                data: {
                    token:  token               
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