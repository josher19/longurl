(function(){
  var argparse, ref$, expect, should, getHistory;
  argparse = require('../argparse');
  ref$ = require('chai'), expect = ref$.expect, should = ref$.should;
  getHistory = function(){
    return ["history_default_value"];
  };
  describe('argparse', function(a){
    it('should take two arguments', function(){
      return expect(argparse.length).equal(2);
    });
    it('second argument should by an argument list or array', function(){
      var ref$, a, b;
      ref$ = argparse([
        {
          "a^": "string"
        }, {
          "b^": "string"
        }
      ], ["hello", "world"]), a = ref$.a, b = ref$.b;
      expect(a).equal("hello");
      return expect(b).equal("world");
    });
    it('first argument should give type of argument expected', function(){
      var ref$, hi, there;
      ref$ = argparse([
        {
          "hi^": "string"
        }, {
          "there^": "string"
        }
      ], ["hello", "world"]), hi = ref$.hi, there = ref$.there;
      expect(hi).equal("hello");
      return expect(there).equal("world");
    });
    it('should be able to give default arguments', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse([
        {
          'file': {
            'otype': "string",
            "defaultV": "history.txt"
          }
        }, {
          'enc^': "string"
        }, {
          'num^': "number"
        }, {
          "hist": {
            "otype": "array",
            "defaultV": getHistory
          }
        }
      ], {}), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof enc).equal("undefined");
      expect(typeof num).equal("undefined");
      expect(typeof file).equal("object");
      return expect(typeof hist).equal("object");
    });
    it('should be able to give types', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse([
        {
          "!file^": "string"
        }, {
          "?enc^": "string"
        }, {
          "?num^": "number"
        }, {
          "hist^": "undefined"
        }, {
          "cb^": "function"
        }
      ], {
        0: "history.txt",
        1: "UTF-8",
        2: 0,
        3: void 8,
        4: getHistory
      }), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("history.txt");
      expect(typeof enc).equal("string");
      expect(enc).not.equal("GBK");
      expect(typeof num).equal("number");
      expect(num).equal(0);
      expect(typeof hist).equal("undefined");
      expect(hist).eql(void 8);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getHistory);
    });
    it('should be able to give object hash', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse({
        0: {
          file: "history.txt"
        },
        1: {
          enc: "UTF-8"
        },
        2: {
          num: 0
        },
        3: {
          "hist": getHistory()
        },
        4: {
          "cb": getHistory
        }
      }, {
        0: "rhistory.txt",
        1: "GBK",
        2: 10,
        3: [1, 2, 3],
        4: null
      }), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("rhistory.txt");
      expect(typeof enc).equal("string");
      expect(enc).equal("GBK");
      expect(typeof num).equal("number");
      expect(num).equal(10);
      expect(typeof hist).equal("object");
      expect(hist).eql([1, 2, 3]);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getHistory);
    });
    it('should be able to give default and infer type', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse([
        {
          file: "history.txt"
        }, {
          enc: "UTF-8"
        }, {
          num: 0
        }, {
          "hist": getHistory()
        }, {
          "cb": getHistory
        }
      ], {
        0: "rhistory.txt",
        1: "GBK",
        2: 10,
        3: [1, 2, 3],
        4: void 8
      }), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("rhistory.txt");
      expect(typeof enc).equal("string");
      expect(enc).equal("GBK");
      expect(typeof num).equal("number");
      expect(num).equal(10);
      expect(typeof hist).equal("object");
      expect(hist).eql([1, 2, 3]);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getHistory);
    });
    it('should work with arrays', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse([
        {
          file: "history.txt"
        }, {
          enc: "UTF-8"
        }, {
          num: 0
        }, {
          "hist": getHistory()
        }, {
          "cb": getHistory
        }
      ], ["rhistory.txt", "GBK", 10, [1, 2, 3], void 8]), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("rhistory.txt");
      expect(typeof enc).equal("string");
      expect(enc).equal("GBK");
      expect(typeof num).equal("number");
      expect(num).equal(10);
      expect(typeof hist).equal("object");
      expect(hist).eql([1, 2, 3]);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getHistory);
    });
    it('should work with function arguments', function(){
      var getArgs, res, ref$, file, enc, num, hist, cb;
      getArgs = function(){
        return arguments;
      };
      ref$ = res = argparse([
        {
          file: "history.txt"
        }, {
          enc: "UTF-8"
        }, {
          num: 0
        }, {
          "hist": getHistory()
        }, {
          "cb": getHistory
        }
      ], getArgs("rhistory.txt", "", void 8, [1, 2, 3], getArgs)), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("rhistory.txt");
      expect(typeof enc).equal("string");
      expect(enc).not.equal("UTF-8");
      expect(enc).equal("");
      expect(typeof num).equal("number");
      expect(num).equal(0);
      expect(typeof hist).equal("object");
      expect(hist).eql([1, 2, 3]);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getArgs);
    });
    return it('should skip ?optional arguments, require !important ones', function(){
      var res, ref$, file, enc, num, hist, cb;
      ref$ = res = argparse([
        {
          "?file": "history.txt"
        }, {
          "?enc": "UTF-8"
        }, {
          "!num": 0
        }, {
          "?hist": [1, 2, 3]
        }, {
          "!cb^": "function"
        }
      ], [8, "GBK", getHistory, [3, 2, 1].reverse()]), file = ref$.file, enc = ref$.enc, num = ref$.num, hist = ref$.hist, cb = ref$.cb;
      expect(typeof file).equal("string");
      expect(file).equal("history.txt");
      expect(typeof enc).equal("string");
      expect(enc).equal("GBK");
      expect(typeof num).equal("number");
      expect(num).equal(8);
      expect(typeof hist).equal("object");
      expect(hist).eql([1, 2, 3]);
      expect(typeof cb).equal("function");
      return expect(cb).equal(getHistory);
    });
  });
}).call(this);
