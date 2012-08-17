function getGlobalFunctions() { var resolved=false, res =Object.keys(global).filter(function(it,ndx) { resolved || (resolved = it === "require"); return resolved && (typeof global[it] == "function") && 25 != String(global[it]).indexOf("[native code]") && it !== "require"  }).map(function(it) { return global[it] }).join("\n\n"); return res;}

function getm(m,into) { into = into || this; return Object.keys(into[m]=require(m)) }

function flushCache(named) { var keys= arguments.length ? arguments : cacheKeys(); for(item in keys) delete require.cache[item]; return keys.length;  }

function cacheKeys() { return Object.keys(require.cache); }

function delCache(named) { var longpath = require.resolve(named); if(delete require.cache[longpath]) return longpath; }

function resolve(named) { return require.cache[require.resolve(named)] }
