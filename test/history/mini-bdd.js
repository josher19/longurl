var done, it, describe;
done = function(err){
  if (err) {
    throw err;
  }
  return "done";
};
it = function(test, fn){
  var e;
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