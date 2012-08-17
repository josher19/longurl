var   longurl = require('../lib/longurl')
    , chai = require('chai')
    , should = chai.should()
    , bitlyshort = 'http://bit.ly/MNwVVo'
    , expectedA = 'http://joel.is/post/29186927028/how-to-name-your-startup'

describe("bit.ly", function() {
  it("should expand", function(done) {
    longurl(bitlyshort, function(url) { 
        if (!url) throw "unable to lookup " + bitlyshort;
        url.should.equal(expectedA); done();  
    })
  });
  it("should fail", function(done) {
    longurl('http://bit.ly/_FAIL_MNwVVo' + 'FAIL', done || function(url) { url.should.equal(expectedA); done();  })
  });
  it("should be null", function(done) {
    longurl('http://bit.ly/_FAIL_MNwVVoX' + 'FAIL', function(url) { (url==null).should.equal(true); done();  })
  });
});

