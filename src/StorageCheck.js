module.exports = function () {
    if (typeof(Storage) === "undefined") {
        console.debug("Storage not supported by this browser.");
        return false;
    }
    return true;
}