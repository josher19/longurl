// Generated by CoffeeScript 1.3.3
var auth_danny;

auth_danny = function(error, brs, status) {
  if (error) {
    throw error;
  }
  return brs.fill('username', 'danny', function() {
    return brs.fill('password', 'devitto', function() {
      return brs.pressButton('Sign In', function() {
        assert.equal(brs.location.pathname, '/');
        return console.log("new html content " + brs.html);
      });
    });
  });
};

describe('authenticate', function() {
  return it('should successfully authenticate user danny', function(auth_danny) {
    return browser.visit("https://localhost:3000/sessions/new", {
      debug: true
    }, function(error, brs, st) {
      console.log("Exploring doc " + brs.html);
      return auth_danny(error, brs, st);
    });
  });
});
