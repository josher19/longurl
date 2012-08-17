var resolve = function resolve(named) { return require.cache[require.resolve(named)] },
  delCache = function delCache(named) { var longpath = require.resolve(named); if(delete require.cache[longpath]) return longpath; },
  cacheKeys = function cacheKeys() { return Object.keys(require.cache); },
  flushCache = function flushCache(named) { var keys= arguments.length ? arguments : cacheKeys(); for(item in keys) delete require.cache[item]; return keys.length;  },
  getm = function getm(m,into) { into = into || this; return Object.keys(into[m]=require(m)) },
  doflush = function flushCache(named) { if (named) return delCache(named); var keys=cacheKeys(); for(item in keys) delete require.cache[item]; return keys.length;  },
  getExports = function getExports() { return "module.exports = {\n\n  " + getGlobalFunctions().join(",\n\n  ") + "\n\n}" },
  showExports = function () { console.log(getExports()); },
  req = function req(str) { return str.split('|').map(function(m) { this[m]=require(m); return m }) },
  getSig = function (func) { var fn = String(func); return fn.substring(0, fn.indexOf("{")  ); },
  saveExports = function (file,enc,cb) { return require('fs').writeFile(file,getExports(),enc,cb || console.log); },
  getg = function getGlobalFunctions() { var resolved=false, res =Object.keys(global).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof global[it] == "function") && 25 != String(global[it]).indexOf("[native code]") && it !== "require" && it !== "_"  }).map(function(it) { return it + ": " + global[it] }); return res;},
  globalFunctions = function globalFunctions() { var resolved=false, res =Object.keys(global).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof global[it] == "function") && 25 != String(global[it]).indexOf("[native code]") && it !== "require" && it !== "_"  }); return res;},
  func2module = function func2module(res) { res = res || globalFunctions(), vars = res.map(function(it,ndx) { return it + " = " + global[it]; }), mod = res.map(function(it) { return it + ": " + it }); return "var " + vars.join(",\n  ") + "\nmodule.exports = {\n  " + mod.join(", ") + "\n};" },
  getExportList = function getExports() { return func2module(); },
  saveExportList = function (file,enc,cb) { return require('fs').writeFile(file,getExportList(),enc,cb || console.log); }
module.exports = {
  resolve: resolve, delCache: delCache, cacheKeys: cacheKeys, flushCache: flushCache, getm: getm, doflush: doflush, getExports: getExports, showExports: showExports, req: req, getSig: getSig, saveExports: saveExports, getg: getg, globalFunctions: globalFunctions, func2module: func2module, getExportList: getExportList, saveExportList: saveExportList
};