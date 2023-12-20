import User from "../models/user.model.js";
import Order from "../models/order.model.js";
import OrderDetail from "../models/orderDetail.model.js";
import Review from "../models/review.model.js";
import bcrypt from "bcrypt";

class ProfileController {
  user = async (req, res, next) => {
    try {
      const user = await User.findById(req.uid);
      res.json({ user });
    } catch (err) {
      next({
        status: 500,
        msg: "Unable to fulfill request at this moment.",
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { fullName, email, phone, address } = req.body;
      await User.findByIdAndUpdate(req.uid, {
        fullName,
        email,
        phone,
        address,
      })
        .then((res) => res.json(res))
        .catch((err) => res.json(err));
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
  password = async (req, res, next) => {
    try {
      const { opassword, password, cpassword } = req.body;

      // Validate input fields
      if (!opassword || !password || !cpassword) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      const user = await User.findById(req.uid);

      if (!user) {
        return next({
          msg: "User not found",
          status: 404,
        });
      }

      const passwordMatch = await bcrypt.compare(opassword, user.password);

      if (passwordMatch) {
        if (password === cpassword) {
          // Check if new password is same as old password
          const newPasswordMatchesOld = await bcrypt.compare(
            password,
            user.password
          );
          if (newPasswordMatchesOld) {
            return next({
              msg: "New password cannot be the same as the old password",
              status: 422,
            });
          }

          const hash = await bcrypt.hash(password, 10);
          await user.updateOne({ password: hash });
          return res.json({
            msg: "Password changed successfully.",
          });
        } else {
          return next({
            msg: "Password and confirm password do not match",
            status: 422,
          });
        }
      } else {
        return next({
          msg: "Incorrect Old Password",
          status: 401,
        });
      }
    } catch (err) {
      return next({
        msg: err.message || "An error occurred while changing password",
        status: 500,
      });
    }
  };
  orders = async (req, res, next) => {
    try {
      const orders = await Order.find({ user_id: req.uid }).exec();
      const list = await Promise.all(
        orders.map(async (order) => {
          const order_details = await OrderDetail.find({
            order_id: order._id,
          }).exec();
          return { ...order._doc, order_details };
        })
      );
      res.json(list);
    } catch (err) {
      return next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
  reviews = async (req, res, next) => {
    try {
      res.json(await Review.find({ user_id: req.uid }).exec());
    } catch (error) {
      return next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
}
export default new ProfileController();
