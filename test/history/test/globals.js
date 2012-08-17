var resolve = function resolve(named) { return require.cache[require.resolve(named)] },
  delCache = function delCache(named) { var longpath = require.resolve(named); if(delete require.cache[longpath]) return longpath; },
  cacheKeys = function cacheKeys() { return Object.keys(require.cache); },
  flushCache = function flushCache(named) { var keys= arguments.length ? arguments : cacheKeys(); for(item in keys) delete require.cache[item]; return keys.length;  },
  getm = function getm(m,into) { into = into || this; return Object.keys(into[m]=require(m)) },
  doflush = function flushCache(named) { if (named) return delCache(named); var keys=cacheKeys(); for(item in keys) delete require.cache[item]; return keys.length;  },
  getExports = function func2module(res) { res = res || globalFunctions(), vars = res.map(function(it,ndx) { return it + " = " + global[it]; }), mod = res.map(function(it) { return it + ": " + it }); return "var " + vars.join(",\n  ") + "\nmodule.exports = {\n  " + mod.join(", ") + "\n};" },
  showExports = function () { console.log(getExports()); },
  req = function req(str) { return str.split('|').map(function(m) { this[m]=require(m); return m }) },
  getSig = function (func) { var fn = String(func); return fn.substring(0, fn.indexOf("{")  ); },
  saveExports = function (file,enc,cb) { return require('fs').writeFile(file,getExports(),enc,cb || console.log); },
  getg = function getGlobalFunctions() { var resolved=false, res =Object.keys(global).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof global[it] == "function") && 25 != String(global[it]).indexOf("[native code]") && it !== "require" && it !== "_"  }).map(function(it) { return it + ": " + global[it] }); return res;},
  globalFunctions = function globalFunctions() { var resolved=false, res =Object.keys(global).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof global[it] == "function") && 25 != String(global[it]).indexOf("[native code]") && it !== "require" && it !== "_"  }); return res;},
  getExportList = function getExportList(res,code,more) { res = res || globalFunctions(), vars = res.map(function(it,ndx) { return it + " = " + global[it]; }), mod = res.concat(more || []).map(function(it) { return it + ": " + it }); return ["var " + vars.join(",\n  "), String(null != code ? code : ""), "module.exports = {\n  " + mod.join(", ") + "\n};"].join("\n") },
  saveExportList = function (file,enc,cb) { return require('fs').writeFile(file,getExportList(),enc,cb || console.log); },
  modular = function func2module(res) { res = res || globalFunctions(), vars = res.map(function(it,ndx) { return it + " = " + global[it]; }), mod = res.map(function(it) { return it + ": " + it }); return "var " + vars.join(",\n  ") + "\nmodule.exports = {\n  " + mod.join(", ") + "\n};" },
  str = function (it) { console.log( String( it )) },
  getGlobalNonFunctions = function getGlobalNonFunctions(g,init,f) { if (null == init) init = "require"; var g = g || global, resolved=f, res = Object.keys(g).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof g[it] !== "function") && 25 != String(g[it]).indexOf("[native code]") && it !== init && it !== "_"  }); return res.map(function(it){ return it + ":" + typeof(g[it])}) },
  initGlobals = function (g) { return Object.keys(g || global); },
  initGlobalKeys = function (g) { return Object.keys(g || global); },
  initGlobal = function (g) { if(null==g) g = global; var k,memo={}; for(k in g) { memo[k] = g[k] }; return memo;},
  isNewGlobal = function isNewGlobal(memo,k,val) { return String(memo[k]) != String(val) && k != "_" },
  getNew = function getNew(g) { var k, g=g||global,res={}; for(k in g) if (isNewGlobal(memo, k, g[k])) res[k] = g[k]; return res; }

module.exports = {
  resolve: resolve, delCache: delCache, cacheKeys: cacheKeys, flushCache: flushCache, getm: getm, doflush: doflush, getExports: getExports, showExports: showExports, req: req, getSig: getSig, saveExports: saveExports, getg: getg, globalFunctions: globalFunctions, getExportList: getExportList, saveExportList: saveExportList, modular: modular, str: str, getGlobalNonFunctions: getGlobalNonFunctions, initGlobals: initGlobals, initGlobalKeys: initGlobalKeys, initGlobal: initGlobal, isNewGlobal: isNewGlobal, getNew: getNew
};