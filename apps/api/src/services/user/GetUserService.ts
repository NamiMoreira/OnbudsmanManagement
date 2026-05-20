import prismaClient from "../../prisma";
const jwt = require('jsonwebtoken');



class GetUserService {
  async executeEmail( email) {
        
      const userAlreadyExists = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (userAlreadyExists) {
        return true;
      } else {
        return false;
      }
    }
    async executeToken(token){
      let response = await prismaClient.userRecovery.findFirst()
        where: {
          token: token
        
      }
      
      if (response) {
        try {
          
          const decoded = await jwt.verify(token,process.env.JWT_SECRET)
          return decoded
          
        } catch (error) {
          console.log(error);
          return 
          
        }
      }
      
    }
  }


export {GetUserService}
