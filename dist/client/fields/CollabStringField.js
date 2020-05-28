(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'sharedb-string-binding', '../utils', 'react-jsonschema-form/lib/utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('sharedb-string-binding'), require('../utils'), require('react-jsonschema-form/lib/utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.sharedbStringBinding, global.utils, global.utils);
    global.CollabStringField = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _sharedbStringBinding, _utils, _utils2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _sharedbStringBinding2 = _interopRequireDefault(_sharedbStringBinding);

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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var CollabStringField = function (_Component) {
    _inherits(CollabStringField, _Component);

    function CollabStringField(props) {
      _classCallCheck(this, CollabStringField);

      var _this = _possibleConstructorReturn(this, (CollabStringField.__proto__ || Object.getPrototypeOf(CollabStringField)).call(this, props));

      var _getUiOptions = (0, _utils2.getUiOptions)(_this.props.uiSchema),
          _getUiOptions$widget = _getUiOptions.widget,
          widget = _getUiOptions$widget === undefined ? 'text' : _getUiOptions$widget;

      var availWidget = (0, _utils.isAvailableWidget)(widget);
      var availFormat = (0, _utils.isAvailableFormat)(_this.props.schema.format);

      // It's collaborative only if it's an available widget, a string and not a date or email:
      _this.isCollab = availWidget && _this.props.schema.type === 'string' && (_this.props.schema.format === undefined || availFormat) && _this.props.schema.enum === undefined;
      return _this;
    }

    _createClass(CollabStringField, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        if (this.isCollab) {
          this.createBinding();
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.isCollab) this.destroyBinding();
      }
    }, {
      key: 'createBinding',
      value: function createBinding() {
        // If it's a single value, we don't define a path
        var path = (0, _utils.findPath)(this.props.idSchema.$id, this.props.name);
        this.binding = new _sharedbStringBinding2.default(this._widget, this.props.formContext, path);
        this.binding.setup();
      }
    }, {
      key: 'destroyBinding',
      value: function destroyBinding() {
        this.binding.destroy();
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            schema = _props.schema,
            name = _props.name,
            uiSchema = _props.uiSchema,
            idSchema = _props.idSchema,
            formData = _props.formData,
            required = _props.required,
            disabled = _props.disabled,
            readonly = _props.readonly,
            autofocus = _props.autofocus,
            onChange = _props.onChange,
            onBlur = _props.onBlur,
            _props$registry = _props.registry,
            registry = _props$registry === undefined ? (0, _utils2.getDefaultRegistry)() : _props$registry;
        var title = schema.title,
            format = schema.format;
        var widgets = registry.widgets,
            formContext = registry.formContext;

        var enumOptions = Array.isArray(schema.enum) && (0, _utils2.optionsList)(schema);
        var defaultWidget = format || (enumOptions ? 'select' : 'text');

        var _getUiOptions2 = (0, _utils2.getUiOptions)(uiSchema),
            _getUiOptions2$widget = _getUiOptions2.widget,
            widget = _getUiOptions2$widget === undefined ? defaultWidget : _getUiOptions2$widget,
            _getUiOptions2$placeh = _getUiOptions2.placeholder,
            placeholder = _getUiOptions2$placeh === undefined ? '' : _getUiOptions2$placeh,
            options = _objectWithoutProperties(_getUiOptions2, ['widget', 'placeholder']);

        var Widget = CollabStringField.getWidget(schema, widget, widgets);

        var ref = {};
        if (this.isCollab) ref.widgetRef = function (w) {
          return _this2._widget = w;
        };

        if (options.emptyValue === undefined) options.emptyValue = '';

        return _react2.default.createElement(Widget, _extends({
          options: _extends({}, options, { enumOptions: enumOptions }),
          schema: schema,
          id: idSchema && idSchema.$id,
          label: title === undefined ? name : title,
          value: formData,
          onChange: onChange,
          onBlur: onBlur,
          required: required,
          disabled: disabled,
          readonly: readonly,
          formContext: formContext,
          autofocus: autofocus,
          registry: registry,
          placeholder: placeholder
        }, ref));
      }
    }], [{
      key: 'getWidget',
      value: function getWidget(schema, widget, widgets) {
        if (widget === 'password') {
          throw Error('You should not use the widget "password" within a collaborative form');
        } else {
          return (0, _utils2.getWidget)(schema, widget, widgets);
        }
      }
    }]);

    return CollabStringField;
  }(_react.Component);

  if (process.env.NODE_ENV !== 'production') {
    CollabStringField.propTypes = {
      schema: _propTypes2.default.object.isRequired,
      uiSchema: _propTypes2.default.object.isRequired,
      idSchema: _propTypes2.default.object,
      onChange: _propTypes2.default.func.isRequired,
      onBlur: _propTypes2.default.func.isRequired,
      formData: _propTypes2.default.oneOfType([_propTypes2.default.PropTypes.string, _propTypes2.default.PropTypes.number]),
      registry: _propTypes2.default.shape({
        widgets: _propTypes2.default.objectOf(_propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object])).isRequired,
        fields: _propTypes2.default.objectOf(_propTypes2.default.func).isRequired,
        definitions: _propTypes2.default.object.isRequired,
        formContext: _propTypes2.default.object.isRequired
      }),
      formContext: _propTypes2.default.object.isRequired,
      required: _propTypes2.default.bool,
      disabled: _propTypes2.default.bool,
      readonly: _propTypes2.default.bool,
      autofocus: _propTypes2.default.bool
    };
  }

  CollabStringField.defaultProps = {
    uiSchema: {},
    registry: (0, _utils2.getDefaultRegistry)(),
    disabled: false,
    readonly: false,
    autofocus: false
  };

  exports.default = CollabStringField;
});