const express = require("express");
const router = express.Router();
const urlController = require("../controllers/shorturl");
router.post("/shortUrl", urlController.createUrl);
router.get("/shortUrl", urlController.getAllUrl);
router.get("/shortUrl/:id", urlController.getUrl);
// router.get("/shortUrl/:id", urlController.deleteUrl);
module.exports = router;
