let expect = require('chai').expect;
let sinon = require('sinon');
let TestStore = require('../src/DefaultLocalStore');
let LocalStorable = require('../src/LocalStorable');

describe('LocalStorableTest', () => {
    let store = new TestStore();

    beforeEach(() => {
        store.clear();
    });

    it('should throw if key not provided in constructor', () => {
        let throws = () => new LocalStorable();

        expect(throws).to.throw;
    });

    it('stores value in localStorage with provided store', () => {
        let testStorable = LocalStorable.withName('testKey').withStorage(store).withValue('test value');

        expect(testStorable.getValue()).to.equal('test value');
    });

    it('stores value in default store', () => {
        let testStorable = LocalStorable.withName('testKey').withValue('test value');

        expect(testStorable.getValue()).to.equal('test value');
    })

    it('should return provided value if key not found', () => {
        let testStorable = LocalStorable.withName('testKey').withStorage(store);
        testStorable.withProvider(() => 'provided value');

        expect(testStorable.getValue()).to.equal('provided value');
    });

    it('should initialize value with provided value', () => {
        let testStorable = LocalStorable.withName('testKey').withProvider(() => 'provided value').initialize();
        testStorable.withProvider(() => 'new provided value');

        expect(testStorable.getValue()).to.equal('provided value');
    });

    it('should ignore provider if not a function', () => {
        let testStorable = LocalStorable.withName('testKey');
        testStorable.withProvider('fail');
        
        expect(testStorable.getValue('testKey')).to.be.null;
    });

    it('should remove value with removeItem', () => {
        let testStorable = LocalStorable.withName('testKey').withValue('test value').withProvider(() => 'provided value');
        expect(testStorable.getValue()).to.equal('test value');
        testStorable.removeValue();
        expect(testStorable.getValue()).to.equal('provided value');
    });
});