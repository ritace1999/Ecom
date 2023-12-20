import Brand from "../../models/brand.model.js";

class BrandsController {
  read = async (req, res, next) => {
    try {
      const brands = await Brand.find();
      if (brands.length === 0) {
        // Check if no brands were found
        res.status(404).json({
          msg: "No brands found",
        });
      } else {
        res.json(brands);
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
      const data = await Brand.create(req.body);
      if (data) {
        res.status(201).json({
          msg: "Brand created.",
        });
      }
    } catch (e) {
      next({
        msg: "Unable to create brand.",
        status: 500,
      });
    }
  };
  readByID = async (req, res, next) => {
    try {
      const data = await Brand.findById(req.params.id);
      if (data) {
        res.json(data);
      } else {
        next({
          msg: "Brand not Found!",
          statusCode: 404,
        });
      }
    } catch (error) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };

  update = async (req, res, next) => {
    try {
      const data = await Brand.findByIdAndUpdate(req.params.id, req.body);
      if (data) {
        res.json({ msg: "Brand updated" });
      } else {
        next({
          msg: "Brand not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const data = await Brand.findByIdAndDelete(req.params.id);
      if (data) {
        res.json({ msg: "Brand deleted" });
      } else {
        next({
          msg: "Brand not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
}

export default new BrandsController();
