import Product from "../../models/product.model.js";
import fs from "fs";

class ProductsController {
  read = async (req, res, next) => {
    try {
      const products = await Product.find();
      if (products.length === 0) {
        // Check if no products were found
        res.status(404).json({
          msg: "No products found",
        });
      } else {
        res.json(products);
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
  create = async (req, res, next) => {
    try {
      const images = req.files.map((file) => file.path);
      const data = await Product.create({ ...req.body, images: images });
      if (data) {
        res.status(201).json({
          message: "Product created successfully",
        });
      } else {
        next({
          msg: "Error creating new product",
        });
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
  readByID = async (req, res, next) => {
    try {
      const data = await Product.findById(req.params.id);
      if (data) {
        res.json(data);
      } else {
        next({
          msg: "Product not found!",
          statusCode: 404,
        });
      }
    } catch (error) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  update = async (req, res, next) => {
    try {
      // Find the product by ID
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }

      let images = [];
      if (req.files.length > 0) {
        // Append new image paths to the images array
        images = [...product.images, ...req.files.map((file) => file.path)];
      } else {
        images = product.images;
      }

      // Update the product using the found product's id
      await Product.findByIdAndUpdate(req.params.id, { ...req.body, images });

      res.status(200).json({
        msg: "Product updated successfully",
      });
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      // Find the product by ID
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({
          msg: "Product not found",
        });
      }

      // Delete associated images from the filesystem
      if (product.images.length > 0) {
        product.images.forEach((imagePath) => {
          // Delete the image file synchronously
          fs.unlinkSync(imagePath);
        });
      }

      // Delete the product
      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        msg: "Product deleted successfully",
      });
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };
}
export default new ProductsController();
