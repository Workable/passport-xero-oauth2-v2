const Strategy = require('passport-oauth2');
const InternalOAuthError = require('passport-oauth2').InternalOAuthError;

/**
 * `Strategy` constructor.
 *
 * Options:
 *   - `clientID`      Xero application's client ID
 *   - `clientSecret`  Xero application's client Secret
 *   - `callbackURL`   URL to which Xero will redirect the user after granting authorization
 *   - `scope`         array of scopes to request defaults to: []
 *                     full set of scopes: https://developer.xero.com/documentation/guides/oauth2/scopes/
 *
 * @constructor
 * @param {object} options
 * @param {function} verify
 * @access public
 */

class XeroStrategy extends Strategy {
  constructor(options = {}, verify) {
    options.authorizationURL = options.authorizationURL || 'https://login.xero.com/identity/connect/authorize';
    options.tokenURL = options.tokenURL || 'https://identity.xero.com/connect/token';
    options.scope = options.scope || [];

    super(options, verify);

    this.name = 'xero';
    this._profileUrl = options.profileUrl || 'https://identity.xero.com/connect/userinfo';
    this._oauth2.useAuthorizationHeaderforGET(true);
    this.scope = options.scope;
  }

  userProfile(accessToken, done) {
    this._oauth2.get(this._profileUrl, accessToken, function(err, body, _res) {
      if (err) {
        return done(
          new InternalOAuthError('Failed to fetch user profile', err)
        );
      }

      let profile;

      try {
        profile = JSON.parse(body);
      } catch (ex) {
        return done(new Error('Failed to parse user profile'));
      }
      done(null, profile);
    });
  }

  authorizationParams(options) {
    const params = {};
    const requested_scopes = (options.scope || '')
      .split(this._scopeSeparator)
      .filter(s => s);

    params.scope = [...new Set([...this.scope, ...requested_scopes])]
      .join(this._scopeSeparator);
    options.scope = params.scope;
    return params;
  }
}

module.exports = XeroStrategy;
