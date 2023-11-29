const router = require("express").Router();
const homeController = require("./controllers/homeController");
const userController = require("./controllers/userController");
const catalogController = require("./controllers/catalogController");

router.use(homeController);
router.use("/users", userController);
router.use("/catalogs", catalogController);

router.get("*", (req, res) => {
  res.redirect("/404");
});

module.exports = router;
