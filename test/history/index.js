/**
 * Save LiveScript REPL history to a file (default: "history.txt")
 */
var fs, history, setDefault, getHistory, saveHistory, readHistory;
fs = require('fs');
history = null;
setDefault = function(hist){
  return history = hist;
};
getHistory = function(){
  var ref$, ref1$, h;
  h = history || (typeof LiveScript != 'undefined' && LiveScript !== null ? LiveScript.history : void 8) || (typeof global != 'undefined' && global !== null ? (ref$ = global.module) != null ? (ref1$ = ref$.exports) != null ? (ref$ = ref1$.repl) != null ? (ref1$ = ref$.rli) != null ? ref1$.history : void 8 : void 8 : void 8 : void 8 : void 8) || (typeof module != 'undefined' && module !== null ? (ref$ = module.exports) != null ? (ref1$ = ref$.repl) != null ? (ref$ = ref1$.rli) != null ? ref$.history : void 8 : void 8 : void 8 : void 8) || (typeof global != 'undefined' && global !== null ? global.history : void 8) || (typeof window != 'undefined' && window !== null ? window.history : void 8);
  if (!h) {
    if (typeof global == 'undefined' || global === null) {
      throw "Must run from REPL or set global history";
    }
    h = [];
  }
  return h.slice().reverse();
};
saveHistory = function(file, enc, num, hist){
  file == null && (file = "history.txt");
  hist == null && (hist = getHistory());
  if (num && typeof num === "number") {
    hist = hist.slice(num);
  }
  fs.writeFileSync(file, hist.join("\n"), enc);
  return "Saved " + hist.length + " lines to " + file;
};
readHistory = function(hist, enc){
  var res;
  hist == null && (hist = "history.txt");
  enc == null && (enc = "UTF-8");
  res = fs.readFileSync(hist, enc);
  console.log(res);
  return res.split("\n");
};
module.exports = {
  read: readHistory,
  write: saveHistory,
  save: saveHistory,
  get: getHistory,
  setDefault: setDefault
};