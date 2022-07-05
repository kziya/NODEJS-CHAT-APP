module.exports = (req, res, next) => {
    res.set("Cache-control", "no-cache, no-store, must-revalidate"); // tells browser not to cache
    res.set("Expires", 0);
    next();
};  