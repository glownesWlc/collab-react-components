(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './server/CollabServer', './server/CollabCollection'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./server/CollabServer'), require('./server/CollabCollection'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.CollabServer, global.CollabCollection);
    global.index = mod.exports;
  }
})(this, function (exports, _CollabServer, _CollabCollection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Collection = exports.Server = undefined;

  var _CollabServer2 = _interopRequireDefault(_CollabServer);

  var _CollabCollection2 = _interopRequireDefault(_CollabCollection);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  exports.Server = _CollabServer2.default;
  exports.Collection = _CollabCollection2.default;
});