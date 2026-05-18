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
exports.SocketService = void 0;
const server_1 = require("../../server");
class SocketService {
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            var name;
            server_1.io.on("connection", (socket) => {
                console.log("🟢 Novo cliente conectado:", socket.id);
                socket.on("userOption", (msg) => {
                    name = msg;
                    console.log(name);
                    socket.emit("botResponse", { from: "bot", text: `Olá ${name}, seu nome está correto?` });
                });
            });
        });
    }
}
exports.SocketService = SocketService;
;
