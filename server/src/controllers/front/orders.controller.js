import Order from "../../models/order.model.js";
import OrderDetail from "../../models/orderDetail.model.js";

class ordersController {
  checkout = async (req, res, next) => {
    let order;

    try {
      const cart = req.body;

      // Create the order
      order = await Order.create({ user_id: req.uid, status: "Processing" });

      // Create order details for each item in the cart
      for (let item of cart) {
        await OrderDetail.create({ ...item, order_id: order._id });
      }

      // Send success response
      res.json({
        success:
          "Thank you for your order.Your order is in processing stage now.",
      });
    } catch (error) {
      if (order) {
        // Attempt to delete order details and order in case of an error
        await OrderDetail.deleteMany({ order_id: order._id });
        await Order.findByIdAndDelete(order._id);
      }

      // Always send the error response using next
      next({
        msg: "Unable to checkout at this moment",
        status: 500,
      });
    }
  };
}
export default new ordersController();
