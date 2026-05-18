import { Socket } from "socket.io";
import prismaClient from "../../prisma";
import { io } from "../../server";
import { formatarDataCustom } from "../../utils/horaFormatada";

interface UserSession {
  id: string;
  name?: string;
  protocol?: string;
  comment?: string;
  stage:
    | "askname"
    | "menu"
    | "consult"
    | "message"
    | "comment"
    | "alterMessage"
    | "sendComment";
}

class SocketService {
  users: Map<string, UserSession> = new Map();

  async execute() {
    io.on("connection", (socket: Socket) => {
      console.log("🟢 Novo cliente conectado:", socket.id);

      this.users.set(socket.id, { id: socket.id, stage: "askname" });

      socket.on("userOption", async (msg: string) => {
        const user = this.users.get(socket.id);
        if (!user) return;

        try {
          switch (user.stage) {
            case "askname":
              user.name = msg;
              user.stage = "menu";
              socket.emit("botResponse", {
                from: "bot",
                text: `Olá ${user.name}! 👋
Digite uma das opções a seguir:
1 - Consultar status manifestação
2 - Adicionar comentário
3 - Anexar documentos`,
              });
              break;

            case "menu":
              if (msg === "1") {
                user.stage = "consult";
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Digite por gentileza seu número de protocolo...",
                });
              } else if (msg === "2") {
                user.stage = "message";
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Por gentileza digite seu número de protocolo...",
                });
              } else if (msg === "3") {
                // 🔥 CORREÇÃO AQUI
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Tudo bem! Você poderá anexar documentos.\nDigite 0 para voltar ao menu principal.",
                  action: "UPLOAD_FILES",
                });
                user.stage = "menu";
              } else if (msg === "0") {
                socket.emit("botResponse", {
                  from: "bot",
                  text: `Digite uma das opções a seguir:
1 - Consultar status manifestação
2 - Adicionar comentário
3 - Anexar documentos`,
                });
              } else {
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Opção inválida. Digite novamente.",
                });
              }
              break;

            case "consult":
              user.protocol = msg;

              const ocurrence = await prismaClient.occurrence.findFirst({
                where: { protocolo: user.protocol },
              });

              if (!ocurrence) {
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Protocolo não encontrado.\nDigite 0 para voltar ao menu principal.",
                });
                user.stage = "menu";
                return;
              }

              const status = await prismaClient.status.findFirst({
                where: { status_id: ocurrence.status_id },
              });

              socket.emit("botResponse", {
                from: "bot",
                text: `A ocorrência aberta em ${formatarDataCustom(
                  ocurrence.created_at
                )} está com status atual: ${
                  status?.status_nome
                }\nDigite 0 para voltar ao menu principal.`,
              });

              user.stage = "menu";
              break;

            case "message":
              user.protocol = msg;

              const occurrenceCheck =
                await prismaClient.occurrence.findFirst({
                  where: { protocolo: user.protocol },
                });

              if (!occurrenceCheck) {
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Protocolo não encontrado.\nDigite 0 para voltar ao menu principal.",
                });
                user.stage = "menu";
                return;
              }

              if (occurrenceCheck.message) {
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Já existe um comentário ainda pendente associado a este protocolo.\nDigite 0 para voltar ao menu principal.",
                });
                user.stage = "menu";
                return;
              }

              user.stage = "comment";
              socket.emit("botResponse", {
                from: "bot",
                text: "Digite por gentileza seu comentário...",
              });
              break;

            case "comment":
              user.comment = msg;
              user.stage = "alterMessage";
              socket.emit("botResponse", {
                from: "bot",
                text: "Gostaria de alterar o comentário?\n1 - Sim\n2 - Não",
              });
              break;

            case "alterMessage":
              if (msg === "1") {
                user.stage = "sendComment";
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Por gentileza digite seu comentário novamente...",
                });
              } else if (msg === "2") {
                await prismaClient.comment.create({
                  data: {
                    occurrence_id: user.protocol as string,
                    content: user.comment,
                    name: user.name,
                    answered: true,
                  },
                });

                await prismaClient.occurrence.update({
                  where: { protocolo: user.protocol },
                  data: { message: true, status_id: 6 },
                });

                socket.emit("botResponse", {
                  from: "bot",
                  text: "Comentário enviado.\nDigite 0 para voltar ao menu principal.",
                });

                user.stage = "menu";
              } else {
                socket.emit("botResponse", {
                  from: "bot",
                  text: "Opção inválida. Digite 1 para Sim ou 2 para Não.",
                });
              }
              break;

            case "sendComment":
              user.comment = msg;

              await prismaClient.comment.create({
                data: {
                  occurrence_id: user.protocol as string,
                  name: user.name,
                  content: user.comment,
                  answered: true,
                },
              });

              await prismaClient.occurrence.update({
                where: { protocolo: user.protocol },
                data: { message: true },
              });

              socket.emit("botResponse", {
                from: "bot",
                text: "Comentário enviado com sucesso.\nDigite 0 para voltar ao menu principal.",
              });

              user.stage = "menu";
              break;

            default:
              socket.emit("botResponse", {
                from: "bot",
                text: "Erro: estágio desconhecido.",
              });
              user.stage = "menu";
          }
        } catch (error) {
          console.error("Erro no processamento da mensagem:", error);
          socket.emit("botResponse", {
            from: "bot",
            text: "Ocorreu um erro. Tente novamente mais tarde.",
          });
          user.stage = "menu";
        }
      });

      socket.on("disconnect", () => {
        console.log("🔴 Cliente desconectado:", socket.id);
        this.users.delete(socket.id);
      });
    });
  }
}

export { SocketService };
