###*
 longurl -- use longurl.com api to get full urls from url-shortening services like bit.ly
 
 Example usage:
   var longurl = require('longurl')
   
   longurl('http://bit.ly/MNwVVo')
   
   var shorturl
   longurl('http://bit.ly/MNwVVo', function(url) { fullurl = url })
   
 
 params
    url String such as http://bit.ly/MNwVVo
    callback(String longurl) where longurl is the full url
    true for console.log or callback verbose(error, resultsObject, body, longurl)
###

request = require 'request'

module.exports = longurl = (url, cb = console.log, verbose = false) -> 
    request.get 'http://www.longurlplease.com/api/v1.1?q=' + url, (err,results,body) -> 
        verbose = console.log if verbose is true
        its = JSON.parse body
        verbose(err, results, body, its) if verbose
        cb (v for k,v of its)[0] 
        its
    undefined;
