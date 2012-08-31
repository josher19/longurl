var it, describe;
it = function(test, fn){
  var done, e;
  done = function(err){
    if (err) {
      throw err;
    }
    return "done";
  };
  try {
    return console.log(["*", test, typeof fn === 'function' ? fn(done) : void 8].join(" "));
  } catch (e$) {
    e = e$;
    return "* " + test + " FAILED: " + e;
  }
};
describe = function(desc, fn){
  console.log(desc);
  return fn();
};
if (typeof module != 'undefined' && module !== null) {
  module.exports = {
    describe: describe,
    it: it
  };
}