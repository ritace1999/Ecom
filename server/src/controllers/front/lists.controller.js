import Category from "../../models/category.model.js";
import Brand from "../../models/brand.model.js";
class listsController {
  categories = async (req, res, next) => {
    try {
      if (req.params.hasOwnProperty("id")) {
        const category = await Category.findById(req.params.id);
        if (category) {
          res.json(category);
        } else {
          next({
            msg: "Category not found",
            status: 404,
          });
        }
      } else {
        const result = await Category.find({ status: true }).exec();
        res.json(result);
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
  brands = async (req, res, next) => {
    try {
      if (req.params.hasOwnProperty("id")) {
        const brand = await Brand.findById(req.params.id);
        if (brand) {
          res.json(brand);
        } else {
          next({
            msg: "Brand not found",
            status: 404,
          });
        }
      } else {
        const result = await Brand.find({ status: true }).exec();
        res.json(result);
      }
    } catch (e) {
      next({
        msg: "Unable to fulfill request at this moment.",
        status: 500,
      });
    }
  };
}
export default new listsController();
