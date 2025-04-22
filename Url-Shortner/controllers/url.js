var nanoId = require("nano-id");
const urlModel = require("../models/url");

async function handleGenerateShortUrl(req, res) {
  const body = req.body;
  if (!body.url) {
    return res.status(400).json({ error: "Url is required." });
  }
  const shortID = nanoId(8);
  await urlModel.create({
    shortId: shortID,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.json({ id: shortID });
}

async function handleRedirectUrl(req, res) {
  const shortId = req.params.shortId;
  const entry = await urlModel.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );
  return res.redirect(entry.redirectUrl);
}

module.exports = {
  handleGenerateShortUrl,
  handleRedirectUrl
};
