import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { SaveNewPasswordService } from './SaveNewPasswordService';
import { SaveTokenService } from './SaveTokenService';

interface AuthRequest {
    email: string;
    password: string;
};

class AuthUserService {
    async execute({ email, password }: AuthRequest) {
        
        if (!email || !password) {
            return ({ logError: true, status: 400, error: "usuario/senha incorreto!" });
        }

        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            },
            select: {
                id: true,
                email: true,
                password: true,
                name: true,
                role: true,       
                sector_id: true
            }
        })

        if (!user) {
            return ({ logError: true, status: 401, error: "usuario/senha incorreto!" });
        }

        const passwordMath = await compare(password, user.password);

        if (!passwordMath) {
            return ({ logError: true, status: 401, error: "usuario/senha incorreto!" });
        }

        const token = sign({
            name: user.name,
            email: user.email,
            role: user.role,
            sector: user.sector_id
        },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '10h'
            }
        );
        const saveTokenService = new SaveTokenService()
            saveTokenService.execute(token)
        // Retornar todos os dados do usuário
        return {
            token: token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role || "Usuário",
                sector: user.sector_id || "Não definido",
            }
        };
    }
};

export { AuthUserService };