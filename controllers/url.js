const shortid = require("shortid");
const URL = require('../models/url');

async function generateNewShortUrl(req, res) {
    try{
        const body = req.body;
        if(!body.url) return res.status(400).json({ error: "URL is required"});
        const shortID = shortid();

        await URL.create({
            shortId: shortID,
            redirectUrl: body.url,
            visitHistory: [],
        });

        return res.json({ id: shortID});
        }
        catch(err){
            console.log({err});
            return res.json({message: err.message});
        }
}

async function redirectToURL(req, res) {
    try{
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate ( 
        {
            shortId,
        },
        {
            $push: {
                visitHistory:{
                    timestamp: Date.now(),
                },
            },
        }
        );
        res.redirect(entry.redirectUrl);
    }
    catch(err){
        console.log({err});
        return res.json({message: err.message});
    }
}

async function getAnalytics(req, res) {
    try{
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        return res.json({
            totalClicks: result.visitHistory.length,
            analytics: result.visitHistory,
        });
    }
    catch(err) {
        console.log({err});
        return res.json({message: err.message});
    }
}

module.exports = {
    generateNewShortUrl,
    redirectToURL,
    getAnalytics,
};