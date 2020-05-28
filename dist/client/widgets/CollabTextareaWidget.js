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
    global.CollabTextareaWidget = mod.exports;
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

  /**
   * Created by dario on 04.04.17.
   */
  function CollabTextareaWidget(props) {
    var id = props.id,
        options = props.options,
        placeholder = props.placeholder,
        value = props.value,
        required = props.required,
        disabled = props.disabled,
        readonly = props.readonly,
        autofocus = props.autofocus,
        onChange = props.onChange,
        onBlur = props.onBlur,
        widgetRef = props.widgetRef;

    var _onChange = function _onChange(_ref) {
      var value = _ref.target.value;

      return onChange(value === '' ? options.emptyValue : value);
    };
    return _react2.default.createElement('textarea', {
      id: id,
      className: 'form-control',
      value: typeof value === 'undefined' ? '' : value,
      placeholder: placeholder,
      required: required,
      disabled: disabled,
      readOnly: readonly,
      autoFocus: autofocus,
      rows: options.rows,
      onBlur: onBlur && function (event) {
        return onBlur(id, event.target.value);
      },
      onChange: _onChange,
      ref: widgetRef
    });
  }

  CollabTextareaWidget.defaultProps = {
    autofocus: false,
    options: {}
  };

  if (process.env.NODE_ENV !== 'production') {
    CollabTextareaWidget.propTypes = {
      schema: _propTypes2.default.object.isRequired,
      id: _propTypes2.default.string.isRequired,
      placeholder: _propTypes2.default.string,
      options: _propTypes2.default.shape({
        rows: _propTypes2.default.number
      }),
      value: _propTypes2.default.string,
      required: _propTypes2.default.bool,
      disabled: _propTypes2.default.bool,
      readonly: _propTypes2.default.bool,
      autofocus: _propTypes2.default.bool,
      onChange: _propTypes2.default.func,
      onBlur: _propTypes2.default.func
    };
  }

  exports.default = CollabTextareaWidget;
});