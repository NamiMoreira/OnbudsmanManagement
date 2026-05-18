import prismaClient from "../../prisma";

class GetUserService {
  async execute(param, email, password = 0) {
    if ((param = "email")) {
        
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
  }
}

export {GetUserService}
