'use strict';

const Promise = require('bluebird');
const express = require('express');
const co = require('co');
const request = Promise.promisifyAll(require('request'));

let app = express();
app.use(express.static(`${__dirname}/public`));
app.listen(3001);

function simisimi(text) {
  let baseUri = 'http://sandbox.api.simsimi.com/request.p';
  let key = 'f05acc71-5f17-4d19-aa10-bd04444c8a80';
  let lc = 'zh';
  return co(function*() {
    let result = yield request.getAsync(baseUri, {qs: {key, lc, text}});
    return JSON.parse(result.body).response;
  });
}

app.get('/chat', function(req, res) {
  co(function*() {
    console.log(`content: ${req.query.text}`);
    var result = yield simisimi(req.query.text);
    res.send(result);
  });
});
