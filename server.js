import http from "http";
import config from "./config/config.js";
import app from "./app.js";
import { initChat } from "./socketChat.js";
import { initMongo } from "./db/mongodb.js";

const PORT = config.port;
console.log("este es el puerto" , PORT);
const server = http.createServer(app);

await initMongo(server);
initChat(server);

server.listen(PORT, () => {
  console.log(`el servidor funciona correctamente en el puerto ${PORT}`);
});
