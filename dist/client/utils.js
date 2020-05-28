(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'underscore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('underscore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.underscore);
    global.utils = mod.exports;
  }
})(this, function (exports, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.isAvailableWidget = isAvailableWidget;
  exports.isAvailableFormat = isAvailableFormat;
  exports.findPath = findPath;

  var _underscore2 = _interopRequireDefault(_underscore);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var availableWidgets = ['text', 'textarea', 'uri']; /**
                                                       * Created by dario on 13.05.17.
                                                       */

  var availableFormats = ['uri'];

  function isAvailableWidget(widget) {
    return _underscore2.default.contains(availableWidgets, widget);
  }

  function isAvailableFormat(format) {
    return _underscore2.default.contains(availableFormats, format);
  }

  function findPath(id, name) {
    var path = ['data'];
    var ids = id.split('_');

    for (var i = 1; i < ids.length; i++) {
      path.push(ids[i]);
    }

    return path;
  }
});