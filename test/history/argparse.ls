# assert = require 'assert'

argparse = (expected, args) ->
    results = {}
    bytype = {
        _add : (typeinfo, added) -> this[typeinfo]  = (this[typeinfo] or []).concat(added)
        _pop : (typeinfo) -> this[typeinfo].pop?()
    }
    for own k, v of expected
        # console.log [ k, v, args[k] ]
        # defaultValue = undefined
        for own named, defaultValue of v
            [named, options] = extract(named)
            dtype = typeof defaultValue
            atype = typeof args[k]
            hit = null
            if options['^'] # ^vars:typeof vars
                # string|number|function|undefined|object note: Array and null both are objects
                dtype = defaultValue 
                defaultValue = undefined
            if options['!'] # !:important, lookup previous skipped variables
                console.log "!", atype, dtype, bytype if argparse.verbose
                if bytype[dtype]
                    results[named] = hit = bytype._pop(dtype) # bytype[dtype].pop()
                    console.info "!hit", hit, named
            if atype == dtype or not args[k]?
                console.log hit if hit? and argparse.verbose
                results[named] = hit ? (args[k] ? defaultValue)
            else
                console.log "\nOOPS", atype, dtype, atype == dtype, atype == defaultValue, options                
                #bytype[atype] = (bytype[atype] or []).concat args[k]                
                bytype._add(atype, args[k])
                if options['?'] # ?vars:defaultValue used when types don't match, skip
                    results[named] = defaultValue
                    console.log named, defaultValue, bytype #if argparse.verbose
                
    results

argparse.extract = extract = (named, options = {}) ->
    named = named.replace /[\^\#\!\?]/g, (c) -> options[c] = true; ""
    [named, options]

argparse.group = (args) ->
    res = {}
    for k, v of args
        atype = typeof v
        atype = "null" if v is null
        if not v?
            v = +k
        res[atype] = (res[atype] or []).concat([v])
    res

module.exports = argparse
