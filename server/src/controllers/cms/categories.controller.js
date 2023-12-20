import Category from "../../models/category.model.js";

class CategoriesController {
  read = async (req, res, next) => {
    try {
      const categories = await Category.find();
      if (categories.length === 0) {
        // Check if no categories were found
        res.status(404).json({
          msg: "No categories found",
        });
      } else {
        res.json(categories);
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
      const data = await Category.create(req.body);
      if (data) {
        res.status(201).json({
          msg: "Category created.",
        });
      }
    } catch (e) {
      next({
        msg: "Unable to create category.",
        status: 500,
      });
    }
  };
  readByID = async (req, res, next) => {
    try {
      const data = await Category.findById(req.params.id);
      if (data) {
        res.json(data);
      } else {
        next({
          msg: "Category not Found!",
          statusCode: 404,
        });
      }
    } catch (error) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await Category.findByIdAndUpdate(req.params.id, req.body);
      if (data) {
        res.json({ msg: "Category updated" });
      } else {
        next({
          msg: "Category not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const data = await Category.findByIdAndDelete(req.params.id);
      if (data) {
        res.json({ msg: "Category deleted" });
      } else {
        next({
          msg: "Category not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
}

export default new CategoriesController();
