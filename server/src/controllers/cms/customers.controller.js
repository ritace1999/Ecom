import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

class CustomersController {
  read = async (req, res, next) => {
    try {
      const data = await User.find({ userType: "Customer" }).exec();
      res.json(data);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };

  create = async (req, res, next) => {
    try {
      const data = await User.findOne({ email: req.body.email });
      if (data) {
        res.status(409).json({
          msg: "Customer already exists",
          success: false,
        });
      } else {
        // Step 2: Create a hash password of req.body.password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Add userType field
        req.body.userType = "Customer";

        const data = await User.create(req.body);
        if (data) {
          const { password, ...otherFields } = data._doc;
          res.json({
            msg: "Customer successfully created",
            success: true,
            userDetails: otherFields,
          });
        }
      }
    } catch (err) {
      // Use the next function to pass the error to the error-handling middleware
      next({
        msg: "Unable to create Customer at this moment", // Use err.message to get the error message
        status: 400,
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { fullName, email, phone, address, status } = req.body;

      // Find the customer member by 'uid'
      const existingCustomers = await User.findById(req.params.id);

      if (!existingCustomers) {
        // If customer member doesn't exist, send a response indicating the error
        return res.status(404).json({
          msg: "Customer not found.",
        });
      }

      // Customer member exists, update their information
      await User.findByIdAndUpdate(req.params.id, {
        fullName,
        email,
        phone,
        address,
        status,
      });

      // Send a JSON response indicating successful customer update
      res.status(200).json({
        success: "Customer Updated.",
      });
    } catch (e) {
      // If an error occurs during the process, execute this block.
      // Pass the error to the error-handling middleware using the next function.
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500, // Set the status code to 500 (Internal Server Error)
      });
    }
  };
  readByID = async (req, res, next) => {
    try {
      // Find the Customer member by their ID
      const data = await User.findById(req.params.id);

      if (data.userType == "Customer") {
        // Send a JSON response with the Customer member's information.
        res.json(data);
      } else {
        // If Customer member doesn't exist or is not a customer member, return err message.
        next({
          msg: "Customer not found or not a customer member.",
          status: 404,
        });
      }
    } catch (e) {
      // If an error occurs during the process, execute this block.
      // Pass the error to the error-handling middleware using the next function.
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const data = await User.findByIdAndDelete(req.params.id);
      if (data) {
        res.json({
          success: "Customer deleted",
        });
      } else {
        next({
          msg: "Customer not found",
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

export default new CustomersController();
