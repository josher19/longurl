# assert = require 'assert'

argparse = (expected, args) ->
    results = {}
    bytype = {
        _add : (typeinfo, added) -> this[typeinfo]  = (this[typeinfo] or []).concat(added),
        _pop : (typeinfo) -> this[typeinfo].pop?()
    }
    for own k, v of expected
        # console.log [ k, v, args[k] ]
        for own named, defaultValue of v
            [named, options] = extract(named)
            dtype = typeof defaultValue
            atype = typeof args[k]
            hit = false
            if options['^'] # ^vars:typeof vars
                # string|number|function|undefined|object note: Array and null both are objects
                dtype = defaultValue 
                defaultValue = undefined
            if options['!'] # !:important, lookup previous skipped variables
                console.log "!", atype, dtype, bytype
                if bytype[dtype]
                    results[named] = hit = bytype._pop(dtype) # bytype[dtype].pop()
                    console.info "!hit", hit
            if atype == dtype or not args[k]?
                results[named] = hit or (args[k] ? defaultValue)
            else
                console.log "\nOOPS", atype, dtype, atype == dtype, atype == defaultValue, options                
                #bytype[atype] = (bytype[atype] or []).concat args[k]                
                bytype._add(atype, args[k])
                if options['?'] # ?vars:defaultValue used when types don't match, skip
                    results[named] = defaultValue
                    console.log bytype
                
    results

argparse.extract = extract = (named, options = {}) ->
    named = named.replace /[\^\#\!\?]/g, (c) -> options[c] = true; ""
    [named, options]

module.exports = argparse
