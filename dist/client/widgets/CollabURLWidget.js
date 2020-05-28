(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './CollabBaseInput'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./CollabBaseInput'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.CollabBaseInput);
    global.CollabURLWidget = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _CollabBaseInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _CollabBaseInput2 = _interopRequireDefault(_CollabBaseInput);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function CollabURLWidget(props) {
    return _react2.default.createElement(_CollabBaseInput2.default, _extends({ type: 'url' }, props));
  }

  if (process.env.NODE_ENV !== 'production') {
    CollabURLWidget.propTypes = {
      value: _propTypes2.default.string
    };
  }

  exports.default = CollabURLWidget;
});