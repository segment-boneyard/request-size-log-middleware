
var onResponse = require('s-on-response');
var defaults = require('defaults');
var extend = require('extend');
var bytes = require('bytes');


/**
 * Expose `generate`.
 */

module.exports = generate;


/**
 * Generate a size log middleware.
 *
 * @param {Logger} logger
 * @param {Object} thresholds
 * @return {Function}
 */

function generate (logger, thresholds) {

  thresholds = defaults(thresholds, {
    warn: bytes('1mb'), // logger.warn after req/res size exceeds 1mb
    error: bytes('2mb') // logger.error after req/res size exceeds 2mb
  });

  var levels = Object.keys(thresholds).sort(function (level) {
    return -thresholds[level];
  });

  return function sizeLog (req, res, next) {
    onResponse(req, res, function (err, summary) {
      var request = summary.request;
      var response = summary.response;

      // check the request size
      var level = exceeds(request.size, levels, thresholds);
      if (level) {
        extend(summary.request, { body: req.body });
        logger[level](reqFormat(summary), summary);
      }

      // check the response size
      level = exceeds(response.size, levels, thresholds);
      if (level) {
        extend(summary.request, { body: req.body });
        logger[level](resFormat(summary), summary);
      }
    });

    next();
  };
}


/**
 * Returns the level at which a `val` exceeds any of the
 * `thresholds`.
 *
 * @param {Number} val
 * @param {Array|String} levels
 * @param {Object} thresholds
 * @return {String}
 *
 */

function exceeds (val, levels, thresholds) {
  for (var i = 0; i < levels.length; i += 1) {
    var level = levels[i];
    var threshold = thresholds[level];
    if (val >= threshold) return level;
  }

  return null;
}


/**
 * Formats the request log message.
 *
 * @param {Object} summary
 * @return {String}
 */

function reqFormat (summary) {
  var request = summary.request;
  var response = summary.response;
  return 'Very large request (' + bytes(request.size) + '): ' +
    request.method + ' ' + request.url + ' ' + response.status;
}


/**
 * Formats the response log message.
 *
 * @param {Object} summary
 * @return {String}
 */

function resFormat (summary) {
  var request = summary.request;
  var response = summary.response;
  return 'Very large response (' + bytes(response.size) + '): ' +
    request.method + ' ' + request.url + ' ' + response.status;
}