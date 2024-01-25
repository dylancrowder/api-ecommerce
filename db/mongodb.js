import mongoose from "mongoose";
import config from "../config/config.js";

export const URI = config.mongodbUri;

export const initMongo = async () => {
  try {
    mongoose.connect(URI);
    console.log("funciona correctamente");
  } catch (erro) {
    console.log("error al intentar conectarse a la db");
  }
};
