import Brand from "../../models/brand.model.js";
import Category from "../../models/category.model.js";
import Product from "../../models/product.model.js";
import mongoose from "mongoose";
import Review from "../../models/review.model.js";

class productsController {
  products = async (req, res, next) => {
    try {
      let conditions = { status: true };
      if (
        req.query.hasOwnProperty("filter") &&
        req.query.filter == "featured"
      ) {
        conditions.featured = true;
      }
      const result = await Product.find(conditions).exec();
      res.json(result);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
  productsById = async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        next({
          msg: "Product not found",
          status: 404,
        });
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
  productsByCategoryID = async (req, res, next) => {
    try {
      let conditions = { status: true, category_id: req.params.id };
      if (
        req.query.hasOwnProperty("filter") &&
        req.query.filter == "featured"
      ) {
        conditions.featured = true;
      }
      const result = await Product.find(conditions).exec();
      res.json(result);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
  productsByBrandID = async (req, res, next) => {
    try {
      let conditions = { status: true, brand_id: req.params.id };
      if (
        req.query.hasOwnProperty("filter") &&
        req.query.filter == "featured"
      ) {
        conditions.featured = true;
      }
      const result = await Product.find(conditions).exec();
      res.json(result);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };

  productSearch = async (req, res, next) => {
    try {
      const searchTerm = req.query.term;
      const uniqueProductIds = new Set(); // Store unique product IDs

      // Search for products with matching name
      const productsByName = await Product.find({
        name: {
          $regex: searchTerm,
          $options: "i",
        },
      }).exec();

      productsByName.forEach((product) => {
        uniqueProductIds.add(product._id.toString()); // Convert to string for consistency
      });

      // Search for brands with matching name
      const brandSearch = await Brand.find({
        name: {
          $regex: searchTerm,
          $options: "i",
        },
      }).exec();
      const brandIds = brandSearch.map((brand) => brand._id);

      // Search for products with matching brand_id
      const brandProducts = await Product.find({
        brand_id: { $in: brandIds },
      }).exec();

      brandProducts.forEach((product) => {
        uniqueProductIds.add(product._id.toString());
      });

      // Search for categories with matching name
      const categorySearch = await Category.find({
        name: {
          $regex: searchTerm,
          $options: "i",
        },
      }).exec();
      const categoryIds = categorySearch.map((category) => category._id);

      // Search for products with matching category_id
      const categoryProducts = await Product.find({
        category_id: { $in: categoryIds },
      }).exec();

      categoryProducts.forEach((product) => {
        uniqueProductIds.add(product._id.toString());
      });

      // Convert Set back to an array of ObjectIds
      const uniqueProductObjectIds = Array.from(uniqueProductIds).map(
        (id) => new mongoose.Types.ObjectId(id)
      );

      // Fetch all products with the unique ObjectIds
      const uniqueProducts = await Product.find({
        _id: { $in: uniqueProductObjectIds },
      }).exec();

      res.json(uniqueProducts);
    } catch (e) {
      console.error(e); // Log the error for debugging
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
  productReview = async (req, res, next) => {
    try {
      const reviewData = {
        ...req.body,
        user_id: req.uid,
        product_id: req.params.id,
      };

      await Review.create(reviewData);

      res.json({ success: "Review has been submitted.", review: reviewData });
    } catch (error) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
}
export default new productsController();
