const XeroStrategy = require('../lib/strategy');
const chai = require('chai');
chai.use(require('chai-passport-strategy'));
global.expect = chai.expect;

describe('XeroStrategy', function() {
  describe('constructed', function() {
    const strategy = new XeroStrategy({
      clientID: 'ABC123',
      clientSecret: 'secret'
    },
    function() {});
  
    it('should be named xero', function() {
      expect(strategy.name).to.equal('xero');
    });
  });

  describe('constructed with undefined options', function() {
    it('should throw', function() {
      expect(function() {
        const strategy = new XeroStrategy(undefined, function() {});
      }).to.throw(Error);
    });
  });

  describe('authorizationParams', function() {
    it('should merge scope params with requested scope params', function() {
      const strategy = new XeroStrategy({
        clientID: 'ABC123',
        clientSecret: 'secret',
        scope: ['openid', 'email', 'profile'] // default scopes
      }, function() {});

      const mergedScopes = strategy.authorizationParams({ scope: 'offline_access' });
      expect(mergedScopes.scope).to.equal('openid email profile offline_access');
    });
  });
});
