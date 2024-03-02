const express = require("express");
const router = express.Router();

const {
    generateNewShortUrl,
    redirectToURL,
    getAnalytics
} = require('../controllers/url');

router.post("/", generateNewShortUrl);

router.get('/:shortId', redirectToURL);

router.get('/analytics/:shortId', getAnalytics);

module.exports = router;