var express = require('express');
var router = express.Router();
var http = require('request-promise-json');
var Promise = require('promise');
var UrlPattern = require('url-pattern');
var config = require('config');

var session, page_filter;
var api_url = new UrlPattern('(:protocol)\\://(:host)(:api)/(:operation)');
var _apis = config.get('APIs');

router.get('/', function (req, res) {
  setGetCustomerOptions(req, res)
    .then(sendApiReq)
    .then(sendResponse)
    .catch(renderErrorPage)
    .done();
});


function setGetCustomerOptions(req, res) {
  var customer_url = api_url.stringify({
    protocol: "http",
    host: _apis.customer.host,
    api: _apis.customer.base_path,
    operation: "customer/search?username=foo"
  });

  var options = {
    method: 'GET',
    url: customer_url,
    strictSSL: false,
    headers: { }
  };

  return new Promise(function (fulfill) {
        fulfill({
          options: options,
          res: res
        });
    });
}

function sendApiReq(function_input) {
  var options = function_input.options;
  var res = function_input.res;

  return new Promise(function (fulfill, reject) {
    http.request(options)
      .then(function (result) {
        fulfill({
          data: result,
          res: res
        });
      })
      .fail(function (reason) {
        reject({
          err: reason,
          res: res
        });
      });
  });
}

function sendResponse(function_input) {
  var data = function_input.data;
  var res = function_input.res;

  res.setHeader('Content-Type', 'application/json');
  res.send(data);
}

function renderErrorPage(function_input) {
  var err = function_input.err;
  var res = function_input.res;

  res.setHeader('Content-Type', 'application/json');
  res.send(err);
}

module.exports = router;

