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
    global.CollabTextWidget = mod.exports;
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

  function CollabTextWidget(props) {
    return _react2.default.createElement(_CollabBaseInput2.default, props);
  }

  if (process.env.NODE_ENV !== 'production') {
    CollabTextWidget.propTypes = {
      value: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
    };
  }

  exports.default = CollabTextWidget;
});