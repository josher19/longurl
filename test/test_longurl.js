var chai = require('chai')
    , should = chai.should()
    , longurl = require('../lib/longurl')
    , expected = 'http://joel.is/post/29186927028/how-to-name-your-startup'

longurl('http://bit.ly/MNwVVo', function(url) { url.should.equal(expected)  })
