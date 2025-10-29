const router = require("express").Router();
const {
  createArticle,
  getArticles,
  getArticleById,
  deleteArticle,
  getArticlePhoto,
  toggleArticle,
} = require("../controllers/articleController");
const authorize = require("../middlewares/authorize");
const admin = require("../middlewares/admin");

router.route("/").post([authorize, admin], createArticle).get(getArticles);

router.route("/:id").get(getArticleById).delete(deleteArticle);

router.route("/:id").put([authorize, admin], toggleArticle);

router.route("/photo/:id").get(getArticlePhoto);

module.exports = router;
