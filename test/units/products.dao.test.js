import mongoose from "mongoose";
import productsDaoMongoDB from "../../dao/products.dao.js";
import { expect } from "chai";

describe("conexion db", function () {
    before(async function () {
        await mongoose.connect("mongodb+srv://devdylancrowder:dilan_07@cluster0.pbvemm9.mongodb.net/ecommerce");
       
        this.productsDaoMongoDB = productsDaoMongoDB;
    });

    it("debe crear un producto de forma exitosa", async function () {
        const data = {
            title: "Nombre del Productoprooooo",
            description: "Descripción del Producto",
            thumbnail: "URL de la imagen del producto",
            size: "M",
            price: 19.99,
            code: "ABC123",
            stock: 100,
            owner: {
                email: "dueño@dominio.com",
                role: "dueño",
            },
        };

        const result = await this.productsDaoMongoDB.create(data);

        expect(result).to.exist;
        expect(result.title).to.equal(data.title);
        expect(result.description).to.equal(data.description);

    });
});
