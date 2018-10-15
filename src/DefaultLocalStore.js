module.exports = class DefaultLocalStore {
    constructor(){ 
        let storedVals = {};

        this.getItem = function(key) {
            return storedVals[key];
        }

        this.setItem = function(key, val) {
            storedVals[key] = val;
        }

        this.removeItem = function(key) {
            delete storedVals[key];
        }

        this.clear = function() {
            storedVals = {};
        }
    };
}