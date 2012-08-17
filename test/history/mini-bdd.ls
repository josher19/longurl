done = (err) -> throw err if err; "done"
it = (test, fn) -> try console.log ["*", test, fn?(done)].join(" ") catch e "* " + test + " FAILED: " + e
describe = (desc, fn) -> console.log desc; fn!
