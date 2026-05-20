import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";
import {SendEmailService} from "../../services/email/SendEmailService"
import { SaveTokenService } from "../../services/user/SaveTokenService";
const path = require("path");
import { readFileSync } from "fs";
const jwt = require('jsonwebtoken');



class RecoveryPasswordController {
  async handle(req: Request, res: Response) {
    let email = req.body;
    email = email.email    
    
    const getUserService = new GetUserService();
    const userAlreadyExists = await getUserService.executeEmail(email);
   
    if (userAlreadyExists) {
      const user =  { "email": email} 
      const token =  jwt.sign(user,process.env.JWT_SECRET,{expiresIn:'1h'})    
                  
      const saveTokenService = new SaveTokenService()
      const resultSaveToken = await saveTokenService.execute(token)
      
      if (resultSaveToken) {
        
          try {
              const sendEmail = new SendEmailService();
              const dir = path.resolve(
                  __dirname,
                  "../../templates/new_password.html",
                );
                var htmlTemplate = readFileSync(dir);
                let texto = htmlTemplate.toString()
                
                texto = texto.replace('{{RESET_LINK}}',`http://local.unimed.test:3000/reset-password?token=${token}`)
                
                console.log(token);
                
                const payload = {
                    from: "noreply@unimedpinda.com.br",
                    to: email,
                    subject: "Recuperar a Senha - Ouvidoria",
                    html: texto,
                };
                                
                var info = await sendEmail.execute(payload);
            } catch (error) {
                console.log(error);
            }
            if (info) {
                res.send('ok').status(200)
                
            }
            
        }else{
            console.log('usuario não encontrado');
            res.send('ok').status(200)
        }
    }else{
            console.log('usuario não encontrado');
            res.send('ok').status(200)
        }
  }
}
export {RecoveryPasswordController}