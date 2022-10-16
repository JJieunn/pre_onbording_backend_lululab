import dotenv from "dotenv";
dotenv.config();
import http from "http";
import { createApp } from "./app";

const app = createApp();

const server = http.createServer(app);
const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}`);
})