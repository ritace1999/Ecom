import Order from "../../models/order.model.js";

class OrdersController {
  read = async (req, res, next) => {
    try {
      const data = await Order.find();
      res.json(data);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };

  readByID = async (req, res, next) => {
    try {
      const data = await Order.findById(req.params.id);
      if (data) {
        res.json(data);
      } else {
        next({
          msg: "Order not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const data = await Order.findByIdAndDelete(req.params.id);
      if (data) {
        res.json({
          success: "Order deleted",
        });
      } else {
        next({
          msg: "Order not found",
          status: 404,
        });
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
}

export default new OrdersController();
