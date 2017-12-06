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
  setGetItemsOptions(req, res)
    .then(sendApiReq)
    .then(sendResponse)
    .catch(renderErrorPage)
    .done();
});

router.get('/:id', function (req, res) {
  setGetItemOptions(req, res)
    .then(sendApiReq)
    .then(sendResponse)
    .catch(renderErrorPage)
    .done();
});

function setGetItemsOptions(req, res) {
  var items_url = api_url.stringify({
    protocol: "http",
    host: _apis.catalog.host,
    api: _apis.catalog.base_path,
    operation: "items"
  });

  var options = {
    method: 'GET',
    url: items_url,
    strictSSL: false,
    headers: {}
  };

  return new Promise(function (fulfill) {
        fulfill({
          options: options,
          res: res
        });
  });
}

function setGetItemOptions(req, res) {
  var params = req.params;

  var item_url = api_url.stringify({
    protocol: "http",
    host: _apis.catalog.host,
    api: _apis.catalog.base_path,
    operation: "items/" + params.id
  });

  var getItem_options = {
    method: 'GET',
    url: item_url,
    strictSSL: false,
    headers: {}
  };

  return new Promise(function (fulfill) {
        fulfill({
          options: getItem_options,
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

