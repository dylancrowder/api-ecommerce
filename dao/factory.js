import config from "../config/config.js";

export let contactDao;

switch (config.mongodbUri) {
  default:
    const ContactDaoMongoDb = (await import("../dao/user.dao.js")).default;
    contactDao = new ContactDaoMongoDb();
    break;
}
