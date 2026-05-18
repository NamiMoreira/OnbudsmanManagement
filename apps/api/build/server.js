"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
require("express-async-errors");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const socket_io_1 = require("socket.io");
const SocketService_1 = require("./services/socket/SocketService");
const app = (0, express_1.default)();
const port = 8090;
const host = "192.168.30.26";
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", "http://192.168.30.26:3000"], // dev
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use("/files", express_1.default.static(path_1.default.resolve(__dirname, "..", "tmp")));
app.use(routes_1.router);
app.options("*", (0, cors_1.default)());
app.use((err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({
        status: "error",
        message: "Internal server error...",
    });
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});
exports.io = io;
const socketService = new SocketService_1.SocketService();
socketService.execute();
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
