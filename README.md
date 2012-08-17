longurl -- use longurl.com api to get full urls from url-shortening services like bit.ly
 
Example usage:
```javascript
   var longurl = require('longurl')
   
   longurl('http://bit.ly/MNwVVo')
   
   var fullurl
   longurl('http://bit.ly/MNwVVo', function(url) { fullurl = url })
```
