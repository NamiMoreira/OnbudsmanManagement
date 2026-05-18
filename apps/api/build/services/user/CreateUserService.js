"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserService = void 0;
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcryptjs_1 = require("bcryptjs");
class CreateUserService {
    execute(_a) {
        return __awaiter(this, arguments, void 0, function* ({ name, email, password, role }) {
            const userAlreadyExists = yield prisma.user.findFirst({
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
                return { logError: 1, status: 406, error: "Email já existe!" };
            }
            const passwordHash = yield (0, bcryptjs_1.hash)(password, 8);
            const user = yield prisma.user.create({
                data: {
                    name: name,
                    email: email,
                    password: passwordHash,
                    role: Number(role)
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });
            return user;
        });
    }
}
exports.CreateUserService = CreateUserService;
