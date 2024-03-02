const express = require("express");
const router = express.Router();

const {
    generateNewShortUrl,
    redirectToURL,
    getAnalytics,
    fetchShortUrl,
} = require('../controllers/url');

router.post("/", generateNewShortUrl);

router.get('/:shortId', redirectToURL);

router.get('/analytics/:shortId', getAnalytics);

router.get('/:shortId/redirecturl', fetchShortUrl);

module.exports = router;