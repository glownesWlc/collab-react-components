(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.CollabBaseInput = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  function CollabBaseInput(props) {
    var value = props.value,
        readonly = props.readonly,
        disabled = props.disabled,
        autofocus = props.autofocus,
        onBlur = props.onBlur,
        options = props.options,
        schema = props.schema,
        formContext = props.formContext,
        registry = props.registry,
        widgetRef = props.widgetRef,
        inputProps = _objectWithoutProperties(props, ['value', 'readonly', 'disabled', 'autofocus', 'onBlur', 'options', 'schema', 'formContext', 'registry', 'widgetRef']);

    inputProps.type = options.inputType || inputProps.type || 'text';
    var _onChange = function _onChange(_ref) {
      var value = _ref.target.value;

      return props.onChange(value === '' ? options.emptyValue : value);
    };

    return _react2.default.createElement('input', _extends({
      className: 'form-control',
      readOnly: readonly,
      disabled: disabled,
      autoFocus: autofocus,
      value: value === null ? '' : value
    }, inputProps, {
      onChange: _onChange,
      onBlur: onBlur && function (event) {
        return onBlur(inputProps.id, event.target.value);
      },
      ref: widgetRef
    }));
  }

  CollabBaseInput.defaultProps = {
    type: 'text',
    required: false,
    disabled: false,
    readonly: false,
    autofocus: false
  };

  if (process.env.NODE_ENV !== 'production') {
    CollabBaseInput.propTypes = {
      id: _propTypes2.default.string.isRequired,
      placeholder: _propTypes2.default.string,
      value: _propTypes2.default.any,
      required: _propTypes2.default.bool,
      disabled: _propTypes2.default.bool,
      readonly: _propTypes2.default.bool,
      autofocus: _propTypes2.default.bool,
      onChange: _propTypes2.default.func,
      onBlur: _propTypes2.default.func
    };
  }

  exports.default = CollabBaseInput;
});