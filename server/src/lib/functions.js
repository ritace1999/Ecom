import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import fs from "fs";
import multer from "multer";

export const authCheck = async (req, res, next) => {
  if (!req.headers.hasOwnProperty("authorization")) {
    next({
      msg: "Token missing",
      status: 401,
    });
  }
  try {
    const decoded = jwt.verify(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_KEY
    );
    const user = await User.findById(decoded.uid);

    if (user.status == true) {
      req.user = user;
      req.uid = decoded.uid;
    } else {
      next({
        msg: "User Inactive",
        status: 403,
      });
    }
  } catch (e) {
    next({
      msg: "Token Invalid",
      status: 401,
    });
  }

  next();
};

export const cmsCheck = (req, res, next) => {
  if (req.user.userType == "Customer") {
    next({
      msg: "You are not authorized to access this route",
      status: 403,
    });
  } else {
    next();
  }
};
export const adminCheck = (req, res, next) => {
  if (req.user.userType == "Customer" || req.user.userType == "Staff") {
    next({
      msg: "You are not authorized to access this route",
      status: 403,
    });
  } else {
    next();
  }
};

export const customerCheck = (req, res, next) => {
  if (req.user.userType !== "Customer") {
    next({
      msg: "You are not authorized to access this route as a customer",
      status: 403,
    });
  } else {
    next();
  }
};

const allowedImageMimeTypes = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
];
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9);
    const ext = file.originalname.split(".").pop();

    // Check if the MIME type is in the list of allowed image MIME types
    if (allowedImageMimeTypes.includes(file.mimetype)) {
      const filename = file.fieldname + uniqueSuffix + "." + ext;
      cb(null, filename);
    } else {
      cb({ msg: "File type not allowed." });
    }
  },
});

export const upload = multer({ storage: storage });
