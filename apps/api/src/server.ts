import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes/routes";
import "express-async-errors";
import cors from "cors";
import path from "path";
import http from "http";
import { uploadRoutes } from "./routes/upload.routes";
import { Server } from "socket.io";
import { SocketService } from "./services/socket/SocketService";

const app = express();
const port = 8090;
const host = "192.168.30.26";

const allowedOrigins = [
  "http://local.unimed.test:3000",
  "http://local.unimed.test:3001",
  "http://192.168.30.26:3000",
  "http://192.168.30.26:3001",
  "http://localhost:3000"
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));
app.use(uploadRoutes);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);
app.use(
  (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      console.log(err.message);
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
      status: "error",
      message: "Internal server error...",
    });
  }
);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

export { io };

const socketService = new SocketService();
socketService.execute();

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
