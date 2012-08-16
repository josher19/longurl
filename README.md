longurl -- use longurl.com api to get full urls from url-shortening services like bit.ly
 
Example usage:
```
   var longurl = require('longurl')
   
   longurl('http://bit.ly/MNwVVo')
   
   var shorturl
   longurl('http://bit.ly/MNwVVo', function(url) { fullurl = url })
```
