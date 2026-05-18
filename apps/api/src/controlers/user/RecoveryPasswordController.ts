import { Request, Response } from "express";
import { GetUserService } from "../../services/user/GetUserService";
import {SendEmailService} from "../../services/email/SendEmailService"
import { SaveTokenService } from "../../services/user/SaveTokenService";
const path = require("path");
import { readFileSync } from "fs";
const crypto = require('crypto');


class RecoveryPasswordController {
  async handle(req: Request, res: Response) {
    let email = req.body;
    email = email.email
    console.log(email);
    
    const getUserService = new GetUserService();
    const userAlreadyExists = await getUserService.execute("email", email);
    if (userAlreadyExists) {
      const token = crypto.randomBytes(32).toString('hex');  
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
      const saveTokenService = new SaveTokenService()
      const resultSaveToken = await saveTokenService.execute(token,email,expiresAt)
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
                
                
                const payload = {
                    from: "noreply@unimedpinda.com.br",
                    to: email,
                    subject: "Recuperar a Senha - Ouvidoria",
                    html: texto,
                };
                
                console.log(payload.html);
                
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
    }
  }
}
export {RecoveryPasswordController}