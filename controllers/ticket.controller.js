import TicketService from "../services/ticket.service.js";
import CartService from "../services/cart.service.js";
import UserController from "./user.controller.js";



export default class TicketController {
    static async generateTicket(cartId) {
        try {

            const cart = await CartService.getByIdCart(cartId);
            const getUser = await UserController.findById(cart.user.toString())
            const userEmail = getUser[0].email;



            //buscar los productos que superan el stock y separarlos
            let sinStock = [];
            let cartWhitStock = cart.products.filter((item) => {
                const stockQuantity = item.product.stock;
                const purchaseQuantity = item.quantity;

                if (stockQuantity < purchaseQuantity) {
                    console.log("El producto está sin stock", item.product.code, stockQuantity, purchaseQuantity);
                    sinStock.push(item.product.code);
                    return false;
                }

                return true;
            });


            //obtener el monto total
            const total = cartWhitStock.reduce(
                (total, productEntry) => total + productEntry.product.price * productEntry.quantity,
                0
            );
            console.log("Productos con stock:", total);
            console.log("Productos sin stock:", sinStock);


            const newTicket = {

                amount: total,
                purchaser: userEmail
            }

            const generatedTicket = await TicketService.generateTicket(newTicket);


            return generatedTicket;
        } catch (error) {

            console.error("Error al generar el ticket:", error);
            throw error;
        }
    }
}


