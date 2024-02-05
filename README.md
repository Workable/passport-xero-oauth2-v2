Passport strategy for authenticating with [Xero](https://developer.xero.com/documentation/guides/oauth2/auth-flow/) using the OAuth 2.0 API.

## Installation

```shell
$ npm install @workablehr/passport-xero-oauth2-v2
```

## Usage

This module is based on [Passport OAuth2](https://github.com/jaredhanson/passport-oauth2) module. It is used in the same way as other Passport strategies.

### Example:

```js
passport.use(new XeroStrategy({
    clientId: XERO_CLIENT_ID,
    clientSecret: XERO_CLIENT_SECRET,
    callbackURL: "http://yourapp.io/auth/xero/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    User.findOrCreate({ xero_id: profile.xero_userid }, function (err, user) {
      return cb(err, user);
    });
  }
));
```