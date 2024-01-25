import express from "express";
import path from "path";
const app = express();
app.use(express.json());
import { __dirname } from "./utils.js";
import handlebars from "express-handlebars";
import inicio from "./routers/api/inicio.router.js";
import productRouterApi from "./routers/api/products.router.js";
import cartRouterApi from "./routers/api/carts.router.js";
import cookieParser from "cookie-parser";
import userLogin from "./routers/api/sessions.router.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import { URI } from "./db/mongodb.js";
import passport from "passport";
import { init as initPassport } from "./config/passportConfig.js";
import ensureAuthenticated from "./config/auth.validation.js";
import auth from "./routers/auth.router.js"
const SECRET = ",9O1z?Vq2yV0";

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: URI,
      mongoOptions: {},
      ttl: 60 * 30
    }),
    secret: SECRET,
    resave: true,
    saveUninitialized: true
  })
);
app.use(cookieParser());
app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/", userLogin);
app.use("/", auth)
app.use("/api",ensureAuthenticated,  productRouterApi, cartRouterApi, inicio);

export default app;
