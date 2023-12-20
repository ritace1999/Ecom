import Review from "../../models/review.model.js";

class ReviewsController {
  read = async (req, res, next) => {
    try {
      const data = await Review.find();
      res.json(data);
    } catch (e) {
      next({
        msg: "Unable to fulfill request at the moment",
        status: 500,
      });
    }
  };

  readByID = async (req, res, next) => {
    try {
      const data = await Review.findById(req.params.id);
      if (data) {
        res.json(data);
      } else {
        next({
          msg: "Review not found",
          status: 404,
        });
      }
    } catch (e) {
      next({ msg: "Unable to fulfill request at the moment", status: 500 });
    }
  };
  deleteById = async (req, res, next) => {
    try {
      const data = await Review.findByIdAndDelete(req.params.id);
      if (data) {
        res.json({
          success: "Review deleted",
        });
      } else {
        next({
          msg: "Review not found",
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

export default new ReviewsController();
