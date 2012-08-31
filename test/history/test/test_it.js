(function(){
  var ref$, expect, should, describe_, _it, _describe;
  ref$ = require('chai'), expect = ref$.expect, should = ref$.should;
  _it = it;
  console.log(it.toString());
  console.log(describe.toString());
  describe("it gets shadowed", function(){
    return _it("_it should work", function(done){
      expect(it.toString()).equal(_it.toString());
      return done();
    });
  });
  _it = it;
  describe('working features', function(){
    return _it('works', function(){});
  });
  _describe = describe;
  describe_ = function(dsc, callback){
    return _describe(dsc, function(){
      return callback(_it);
    });
  };
  describe_('patch describe', function(it){
    var me;
    it('should work with done', function(done){
      expect(String(it)).equal(String(_it));
      return done();
    });
    me = it;
    return it('should work w/o done', function(){
      return expect(String(me)).equal(String(_it));
    });
  });
  describe('Testing with Mocha or Jasmine', function(x){
    return it('should be possible to run this code', function(){
      return expect(true).equal(true);
    });
  });
  describe('Testing with Mocha or Jasmine', function(){
    return _it('should be possible to run this code', function(){
      return expect(true).equal(true);
    });
  });
  describe_('Testing with Mocha or Jasmine', function(it){
    return it('should be possible to run this code', function(){
      return expect(true).equal(true);
    });
  });
}).call(this);
