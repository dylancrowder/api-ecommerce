import dotenv from "dotenv";
import { Command } from "commander";

const program = new Command();

program
  .option(
    "--mode <mode>",
    "este es el modo de ejecucuon del back ",
    "development"
  )
  .parse();

const mode = program.opts().mode;
let path;

if (mode === "production") {
  path = "./.env.production";
} else {
  path = "./.env.development";
}
console.log("este es el modo ", mode);
dotenv.config({ path });
export default {
  env: process.env.MODE_ENV,
  port: process.env.PORT || 3000,
  mongodbUri:
    process.env.MONGODB_URI ||
    "mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/ecommerce"
};


