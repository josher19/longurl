it = (test, fn) -> 
    done = (err) -> throw err if err; "done"
    try console.log ["*", test, fn?(done)].join(" ") catch e "* " + test + " FAILED: " + e
describe = (desc, fn) -> 
    console.log desc; fn!
module.exports = {describe:describe, it:it} if module?
