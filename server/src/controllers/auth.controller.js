import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import fs from "fs";

class AuthController {
  login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then((data) => {
        if (data) {
          bcrypt
            .compare(req.body.password, data.password)
            .then((isMatched) => {
              if (isMatched) {
                const token = jwt.sign(
                  {
                    uid: data._id,
                    exp: Math.floor(Date.now() / 1000 + 30 * 24 * 60 * 60),
                  },
                  process.env.JWT_KEY
                );
                res.json({
                  msg: "Login successfully",
                  success: true,
                  token: token,
                  userDetails: data,
                });
              } else {
                next({
                  msg: "Incorrect Password",
                  status: 404,
                });
              }
            })
            .catch((err) => {
              next({
                msg: "Error comparing passwords",
                status: 500,
              });
            });
        } else {
          next({
            msg: "Incorrect Email",
            status: 404,
          });
        }
      })
      .catch((err) => {
        next({
          msg: "Error finding user",
          status: 500,
        });
      });
  };

  register = async (req, res, next) => {
    try {
      const data = await User.findOne({ email: req.body.email });
      if (data) {
        res.status(409).json({
          msg: "User already exists",
          success: false,
        });
      } else {
        // const profile = req.files.map((file) => file.path);
        //step 2: create a hash password of req.body.password
        req.body.password = await bcrypt.hash(req.body.password, 10);
        //step 3: create a jwt token for the user
        // const token = jwt.sign({ phoneNumber: req.body.phoneNumber }, process.env.SECRET_KEY);
        const data = await User.create({ ...req.body });
        if (data) {
          const { password, ...otherFields } = data._doc;
          res.json({
            msg: "You are successfully registered",
            success: true,
            userDetails: otherFields,
          });
        }
      }
    } catch (err) {
      // Use the next function to pass the error to the error-handling middleware
      next({
        msg: "Unable to register at this moment", // Use err.message to get the error message
        status: 400,
      });
    }
  };
}

export default new AuthController();
