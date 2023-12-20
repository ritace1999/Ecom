import User from "../../models/user.model.js";
import bcrypt from "bcrypt";

class StaffController {
  index = async (req, res, next) => {
    try {
      const user = await User.find({ userType: "Staff" }).exec();
      res.json(user);
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
          msg: "Staff already exists",
          success: false,
        });
      } else {
        // Step 2: Create a hash password of req.body.password
        req.body.password = await bcrypt.hash(req.body.password, 10);

        // Add userType field
        req.body.userType = "Staff";

        const data = await User.create(req.body);
        if (data) {
          const { password, ...otherFields } = data._doc;
          res.json({
            msg: "Staff successfully created",
            success: true,
            userDetails: otherFields,
          });
        }
      }
    } catch (err) {
      // Use the next function to pass the error to the error-handling middleware
      next({
        msg: "Unable to create staff at this moment", // Use err.message to get the error message
        status: 400,
      });
    }
  };

  update = async (req, res, next) => {
    try {
      const { fullName, email, phone, address, status } = req.body;

      // Find the staff member by 'uid'
      const existingStaff = await User.findById(req.params.id);

      if (!existingStaff) {
        // If staff member doesn't exist, send a response indicating the error
        return res.status(404).json({
          msg: "Staff not found.",
        });
      }

      // Staff member exists, update their information
      await User.findByIdAndUpdate(req.params.id, {
        fullName,
        email,
        phone,
        address,
        status,
      });

      // Send a JSON response indicating successful staff update
      res.status(200).json({
        success: "Staff Updated.",
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
      // Find the staff member by their ID
      const staff = await User.findById(req.params.id);

      if (staff.userType == "Staff") {
        // Send a JSON response with the staff member's information.
        res.json(staff);
      } else {
        // If staff member doesn't exist or is not a staff member, return err message.
        next({
          msg: "Staff not found or not a staff member.",
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
      const staff = await User.findByIdAndDelete(req.params.id);
      if (staff) {
        res.json({
          success: "Staff deleted",
        });
      } else {
        next({
          msg: "Staff not found",
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

export default new StaffController();
