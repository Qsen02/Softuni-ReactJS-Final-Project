function setCors() {
    return function(req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, DELETE, POST");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Authorization");
        next();
    }
}

module.exports = {
    setCors
}