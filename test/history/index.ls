/**
 * Save LiveScript REPL history to a file (default: "history.txt")
 */

fs = require 'fs'

history = null

setDefault = (hist) ->
    history := hist

getHistory = ->
#    if LiveScript?
#        LiveScript.history.slice!.reverse! 
#    else 
#        global.module.exports.repl?.rli.history.slice!.reverse!
    h = history or 
        LiveScript?.history or 
        global?.module?.exports?.repl?.rli?.history or 
        module?.exports?.repl?.rli?.history or
        global?.history or 
        window?.history
    if not h
        throw "Must run from REPL or set global history" if not global?
        h = []
    h.slice!.reverse!

saveHistory = (file="history.txt", enc, num, hist=getHistory!) -> 
#    [enc,num] = [num,enc] if typeof enc is "number"
#    enc = num if typeof num is "string"
#    hist = enc if enc and enc.slice
#    hist = num if num and num.slice
    if num and typeof num is "number"
       hist = hist.slice(num) 
    fs.writeFileSync file, hist.join("\n"), enc
    "Saved #{hist.length} lines to #{file}"

readHistory = (hist="history.txt", enc="UTF-8") -> 
    res = fs.readFileSync hist, enc
    console.log res
    res.split "\n"

module.exports = {read: readHistory, write: saveHistory, save: saveHistory, get: getHistory, setDefault: setDefault}
