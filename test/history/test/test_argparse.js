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
  it('should skip ?optional arguments, require !important ones', function(){
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
  it('should be able to mix defaults and types (^)', function(){
    var res, ref$, file, encoding, cb;
    ref$ = res = argparse([
      {
        'file^': 'string'
      }, {
        'encoding': 'UTF-8'
      }, {
        '!cb^': 'function'
      }
    ], {
      0: "history.txt",
      1: "GBK"
    }), file = ref$.file, encoding = ref$.encoding, cb = ref$.cb;
    expect(typeof file).equal('string');
    expect('history.txt').equal(file);
    expect('string').equal(typeof encoding);
    expect(encoding).equal('GBK');
    return expect('undefined').equal(typeof cb);
  });
  it('should work for falsey values', function(){
    var res, ref$, bool, str, num;
    ref$ = res = argparse([
      {
        'bool^': 'boolean'
      }, {
        '?str^': 'string'
      }, {
        '!num^': 'number'
      }
    ], [false, 0, '']), bool = ref$.bool, str = ref$.str, num = ref$.num;
    console.log(res);
    expect(typeof bool).equal('boolean');
    expect(false).equal(bool);
    expect(typeof num).equal('number');
    return expect(0).equal(num);
  });
  return it('should be able to group arguments', function(){
    var res, expectedRes;
    res = argparse.group([
      false, 0, '', getHistory, void 8, {
        found: true
      }, [1, 2, 3, "four"], null
    ]);
    console.log(res);
    expect(res['boolean']).exists;
    expect(res['boolean'].length).equal(1);
    expect(res['boolean'][0]).not.equal(null);
    expect(false).equal(res['boolean'][0]);
    expect(0).equal(res['number'][0]);
    expect('').equal(res['string'][0]);
    expect(getHistory).equal(res['function'][0]);
    expect(4).equal(res['undefined'][0]);
    expect(res['boolean'].length).greaterThan(0);
    expect(true).equal(res['object'][0].found);
    expect(4).equal(res['object'][1].length);
    expect(7).equal(res['null'][0]);
    expectedRes = {
      boolean: [false],
      number: [0],
      string: [''],
      'function': [getHistory],
      undefined: [4],
      object: [
        {
          found: true
        }, [1, 2, 3, 'four']
      ],
      'null': [7]
    };
    return expect(res).eql(expectedRes);
  });
});