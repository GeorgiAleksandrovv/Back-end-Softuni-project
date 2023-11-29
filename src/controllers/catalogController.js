const router = require("express").Router();
const offerService = require("./../services/offerService");
const { isAuth } = require("./../middlewares/authMiddleware");
const {extractErrorMsgs} = require("./../utils/errorHandler")

router.get("/catalog", async (req, res) => {
  const offers = await offerService.getAll().lean();
  res.render("post/catalog", { offers });
});

router.get("/search", isAuth, async(req, res) => {
  const {name, searchType} = req.query;
  const offer = await offerService.search(name, searchType)
  res.render("post/search", {offer})
})

router.get("/create", isAuth, (req, res) => {
  res.render("post/create");
});

router.post("/create", isAuth, async (req, res) => {
  const {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
    owner,
  } = req.body;
  const payload = {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
    owner: req.user,
  };

  try {
    
    await offerService.create(payload);
    res.redirect("/catalogs/catalog");
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages })
  }

  
});

router.get("/:offerId/details",  async (req, res) => {
  const { offerId } = req.params;

  const offer = await offerService.singleOffer(offerId).lean();

  const { user } = req;
  const { owner } = offer;
  const isOwner = user?._id !== owner.toString();
  const isBuyer = offer.buyers.some((id) => id == req.user?._id);

  res.render("post/details", { offer, isOwner, isBuyer });
});

router.get("/:offerId/edit", isAuth, async (req, res) => {
  const { offerId } = req.params;

  const offer = await offerService.singleOffer(offerId).lean();

  res.render("post/edit", { offer });
});

router.post("/:offerId/edit", isAuth, async (req, res) => {
  const { offerId } = req.params;

  const {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
    owner,
  } = req.body;
  const payload = {
    name,
    type,
    production,
    exploitation,
    damages,
    image,
    price,
    description,
    owner: req.user,
  };

  try {
    
    await offerService.update(offerId, payload);
    res.redirect(`/catalogs/${offerId}/details`);
  } catch (error) {
    const errorMessages = extractErrorMsgs(error);
    res.status(404).render("post/create", { errorMessages })
  }

});

router.get("/:offerId/delete", isAuth, async (req, res) => {
  const { offerId } = req.params;

  await offerService.delete(offerId);

  res.redirect("/catalogs/catalog");
});

router.get("/:offerId/buy", isAuth, async (req, res) => {
  await offerService.buy(req.user._id, req.params.offerId);

  res.redirect(`/catalogs/${req.params.offerId}/details`);
});

module.exports = router;
