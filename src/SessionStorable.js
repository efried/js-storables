const hasStorage = require('./StorageCheck');
const DefaultStore = require('./DefaultLocalStore');

module.exports = class SessionStorable {
    constructor (key, provider, storage) {
        if (key) {
            this._key = key;
            if (provider) {
                this._provider = provider;
            }
            if (storage) {
                this._storage = storage;
            } else if (hasStorage()) {
                this._storage = sessionStorage;
            } else {
                this._storage = new DefaultStore();
            }
        } else {
            throw new Error("A key must be supplied to create a SessionStorable");
        }

        this.withProvider = function(provider) {
            if (provider instanceof Function) {
                this._provider = provider;
            } else {
                console.warn("Provider given is not a function");
            }
            return this;
        }

        this.withStorage = function(storage) {
            if (storage instanceof Object) {
                this._storage = storage;
            }
            return this;
        }

        this.getValue = function() {
            if (this._storage && this._storage.getItem(this._key)) {
                return this._storage.getItem(this._key);
            } else {
                if (this._provider) {
                    const returnValue = this._provider();
                    console.debug(`Providing return value => `, returnValue);
                    return returnValue;
                }
                return null;
            }
        }

        this.store = function(storedValue) {
            if (this._storage) {
                this._storage.setItem(this._key, storedValue);
            }
            return this;
        }

        // provided to use fluid api
        this.withValue = function(value) {
            this.store(value);
            return this;
        }

        this.initialize = function() {
            if (this._storage) {
                this._storage.setItem(this._key, this._provider());
            }
            return this;
        }

        this.removeValue = function() {
            if (this._storage) {
                this._storage.removeItem(this._key);
            }
        }
    }

    static withName(key) {
        return new SessionStorable(key);
    }

}