import supertest from "supertest";
import { expect } from 'chai';


const baseURL = 'http://localhost:8080/api';
const request = supertest(baseURL);

describe("Cart Routes", () => {

    describe("GET /cartsview/:uid", () => {
        it("debería retornar un carrito de un usuario", async () => {
            const userId = '65ef23714bfab7b8c00acd71';
            const role = 'admin'; // Establece el rol del usuario para la prueba
            const agent = request.agent(); // Crea un agente de prueba para mantener la sesión

            // Simula la autenticación estableciendo el rol del usuario en la solicitud
            agent.user = { role };

            const response = await agent
                .get(`/cartsview/${userId}`);

            const { statusCode, ok, body } = response;
            console.log("este es el cuerpo", body);
            console.log('Response:', response.header);
            // Imprime la respuesta completa del servidor

            expect(statusCode).to.equal(200);
            expect(ok).to.be.true;

            expect(body).to.exist;
            expect(body).to.have.property('status');
            expect(body).to.have.property('payload');
        });
    });
});


describe("agregar producto al carrito", () => {
    it("deberia agregar un producto al carrito", async () => {
        const product = '65d7d565ec465e35d2519399';
        const response = await request.post(`/add-to-cart/${product}`);
        const { statusCode, ok, _body } = response;
        console.log('Response:', response.text);  // Imprime la respuesta completa del servidor
        expect(statusCode).to.equal(200);
        expect(ok).to.be.true;
        expect(_body).to.exist;
        expect(_body).to.have.property('status');
        expect(_body).to.have.property('payload');
    });
});
});


