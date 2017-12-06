var express = require('express');
var router = express.Router();
var http = require('request-promise-json');
var Promise = require('promise');
var UrlPattern = require('url-pattern');
var config = require('config');
var pkgcloud = require('pkgcloud');

//Download the file
router.get('/:fileName', function(req, res){
    res.sendFile(path.join(__dirname, '../', 'image/', req.params.fileName));
    //res.writeHead(200, {'Content-Type': 'text/html'});
    //res.write();
    //res.end();
});


function renderErrorPage(function_input) {
  var err = function_input.err;
  var res = function_input.res;
  res.render('error', {reason: err});
}

module.exports = router;
