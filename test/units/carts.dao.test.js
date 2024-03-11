import supertest from "supertest";
import { expect } from 'chai';

const baseURL = 'http://localhost:8080/api';
const request = supertest(baseURL);

describe("Cart Routes", () => {
    // Test for GET /cartsview/:uid
    describe("GET /cartsview/:uid", () => {
        it("debería retornar un carrito de un usuario", async () => {
            const userId = '65ef23714bfab7b8c00acd71';

            const response = await request.get(`/cartsview/${userId}`);
            const { statusCode, ok, body } = response;

            console.log('Response:', response.text);  // Imprime la respuesta completa del servidor

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;
            expect(body).to.exist;
            expect(body).to.have.property('status');
            expect(body).to.have.property('payload');
        });
    });
});
