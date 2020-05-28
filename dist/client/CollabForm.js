(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-jsonschema-form', 'underscore', './connection', './fields/CollabStringField', './widgets/CollabTextWidget', './widgets/CollabTextareaWidget', './widgets/CollabURLWidget', 'react-jsonschema-form/lib/utils', './utils'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-jsonschema-form'), require('underscore'), require('./connection'), require('./fields/CollabStringField'), require('./widgets/CollabTextWidget'), require('./widgets/CollabTextareaWidget'), require('./widgets/CollabURLWidget'), require('react-jsonschema-form/lib/utils'), require('./utils'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactJsonschemaForm, global.underscore, global.connection, global.CollabStringField, global.CollabTextWidget, global.CollabTextareaWidget, global.CollabURLWidget, global.utils, global.utils);
    global.CollabForm = mod.exports;
  }
})(this, function (exports, _react, _reactJsonschemaForm, _underscore, _connection, _CollabStringField, _CollabTextWidget, _CollabTextareaWidget, _CollabURLWidget, _utils, _utils2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _reactJsonschemaForm2 = _interopRequireDefault(_reactJsonschemaForm);

  var _underscore2 = _interopRequireDefault(_underscore);

  var _connection2 = _interopRequireDefault(_connection);

  var _CollabStringField2 = _interopRequireDefault(_CollabStringField);

  var _CollabTextWidget2 = _interopRequireDefault(_CollabTextWidget);

  var _CollabTextareaWidget2 = _interopRequireDefault(_CollabTextareaWidget);

  var _CollabURLWidget2 = _interopRequireDefault(_CollabURLWidget);

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

  var CollabForm = function (_Component) {
    _inherits(CollabForm, _Component);

    function CollabForm(props) {
      _classCallCheck(this, CollabForm);

      var _this = _possibleConstructorReturn(this, (CollabForm.__proto__ || Object.getPrototypeOf(CollabForm)).call(this, props));

      _this.state = {
        form: null,
        nonCollabKeys: null,
        isObject: true,
        isCollab: false
      };

      // We define our custom field for collaborative text (all strings)
      _underscore2.default.extend(_this.props.fields, {
        StringField: _CollabStringField2.default
      });
      // We define our custom widgets
      _underscore2.default.extend(_this.props.widgets, {
        TextWidget: _CollabTextWidget2.default,
        TextareaWidget: _CollabTextareaWidget2.default,
        URLWidget: _CollabURLWidget2.default
      });
      return _this;
    }

    _createClass(CollabForm, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.subscribeToForm(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        // We should unsubscribe from the current form and subscribe to the new one
        if (nextProps.id !== this.props.id || nextProps.collectionName !== this.props.collectionName) {
          this.unsubscribe();
          this.subscribeToForm(nextProps);
        }
      }
    }, {
      key: 'subscribeToForm',
      value: function subscribeToForm(props) {
        var form = _connection2.default.get('collab_data_' + props.collectionName, props.id);
        form.subscribe(function (err) {
          if (err) console.log(err);
          if (form.type === null) {
            throw Error('No form exists with id: ' + props.id);
          }
        });

        form.on('load', load.bind(this));
        form.on('op', update.bind(this));
        form.on('del', del.bind(this));

        function load() {
          switch (form.data.schema.type) {
            case 'string':
              var _getUiOptions = (0, _utils.getUiOptions)(props.uiSchema),
                  _getUiOptions$widget = _getUiOptions.widget,
                  widget = _getUiOptions$widget === undefined ? 'text' : _getUiOptions$widget;

              var isSupported = (0, _utils2.isAvailableWidget)(widget);
              if (!isSupported) {
                this.setState({ form: form, isObject: false });
              } else {
                this.setState({ form: form, isObject: false, isCollab: true });
              }
              break;
            case 'object':
              // We save all non-collaborative keys
              var nonCollabKeys = [];
              var properties = form.data.schema.properties;
              Object.keys(properties).forEach(function (key) {
                if (properties[key].type !== 'string') {
                  nonCollabKeys.push(key);
                } else if (props.uiSchema[key]) {
                  var _getUiOptions2 = (0, _utils.getUiOptions)(props.uiSchema[key]),
                      _getUiOptions2$widget = _getUiOptions2.widget,
                      _widget = _getUiOptions2$widget === undefined ? 'text' : _getUiOptions2$widget;

                  var _isSupported = (0, _utils2.isAvailableWidget)(_widget);
                  var isEnum = form.data.schema.properties[key].enum !== undefined;
                  if (!_isSupported || isEnum) {
                    nonCollabKeys.push(key);
                  }
                }
              });
              // Form data available only when we are done loading the form
              this.setState({ form: form, nonCollabKeys: nonCollabKeys });
              break;
            case 'array':
              throw Error('CollabForm: Array type is not yet supported');
              break;
            default:
              this.setState({ form: form, isObject: false });
          }
        }

        function update(op, source) {
          // We only update if we receive a modification from outside on a non collaborative field
          if (this.state.isObject) {
            var isNonCollab = _underscore2.default.contains(this.state.nonCollabKeys, op[0].p[1]);
            if (!source) {
              if (this.props.onRemoteChange) {
                this.props.onRemoteChange(form.data.data);
              }
              if (isNonCollab) {
                this.setState({ form: form });
              }
            }
          } else if (!source && !this.state.isCollab) {
            this.setState({ form: form });
            if (this.props.onRemoteChange) {
              this.props.onRemoteChange(form.data.data);
            }
          }
        }

        function del() {
          this.state.form.destroy();
          this.state.form.unsubscribe();
          this.setState({ form: null });
        }
      }
    }, {
      key: 'onChange',
      value: function onChange(changeStatus) {
        var _this2 = this;

        if (this.state.isObject) {
          Object.keys(changeStatus.formData).forEach(function (key) {
            if (_this2.state.form.data.data[key] !== changeStatus.formData[key]) {
              var op = [{ p: ['data', key], od: null, oi: changeStatus.formData[key] }];
              _this2.state.form.submitOp(op, function (err) {
                if (err) throw err;
              });
            }
          });
        } else if (!this.state.isCollab && this.state.form.data.data !== changeStatus.formData) {
          var op = [{ p: ['data'], od: null, oi: changeStatus.formData }];
          this.state.form.submitOp(op, function (err) {
            if (err) throw err;
          });
        }

        if (this.props.onChange) this.props.onChange(changeStatus);
      }
    }, {
      key: 'unsubscribe',
      value: function unsubscribe() {
        this.state.form.unsubscribe();
        this.state.form.destroy();
        this.setState({ form: null });
      }
    }, {
      key: 'render',
      value: function render() {
        return this.state.form && _react2.default.createElement(_reactJsonschemaForm2.default, _extends({}, this.props, {
          schema: this.state.form.data.schema,
          formData: this.state.form.data.data,
          onChange: this.onChange.bind(this),
          formContext: this.state.form
        }));
      }
    }]);

    return CollabForm;
  }(_react.Component);

  exports.default = CollabForm;


  CollabForm.defaultProps = {
    uiSchema: {},
    widgets: {},
    fields: {},
    noValidate: false,
    liveValidate: false,
    safeRenderCompletion: false,
    noHtml5Validate: false
  };
});