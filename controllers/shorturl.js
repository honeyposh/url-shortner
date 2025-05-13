const urlModel = require("../models/shorturl");

exports.createUrl = async (req, res, next) => {
  try {
    const { fullUrl } = req.body;
    const baseUrl = `http://localhost:${process.env.PORT}/api/shortUrl`;
    const existing = await urlModel.findOne({ fullUrl });

    if (existing) {
      return res
        .status(200)
        .json({ shorturl: `${baseUrl}/${existing.shortUrl}` });
    }

    const newEntry = await urlModel.create({ fullUrl });
    return res.status(201).json({
      message: "Short URL created successfully",
      //   shortUrl: newEntry.shortUrl,
      shortUrl: `${baseUrl}/${newEntry.shortUrl}`,
    });
  } catch (error) {
    // console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllUrl = async (req, res, next) => {
  try {
    const baseUrl = `http://localhost:${process.env.PORT}/api/shortUrl`;
    const getUrls = await urlModel.find();
    if (getUrls < 0) {
      res.status(404).send(" Short url not found");
    } 
    const shortUrls = getUrls.map((url) => ({
      originalUrl: url.fullUrl,
      shortUrl: `${baseUrl}/${url.shortUrl}`,
    }));
    console.log(shortUrls)
    res.status(200).json({
      success: true,
      urls: shortUrls,
    })
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getUrl = async (req, res, next) => {
  try {
    const shorturl = await urlModel.findOne({ shortUrl: req.params.id });
    // console.log(shorturl.fullUrl);
    if (!shorturl) {
      res.status(404).json("No url");
    } else {
      shorturl.clicks++;
      shorturl.save();
      res.redirect(`${shorturl.fullUrl}`);
    }
  } catch (error) {
    // console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
