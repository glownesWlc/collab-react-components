(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-quill', './connection', 'underscore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-quill'), require('./connection'), require('underscore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactQuill, global.connection, global.underscore);
    global.CollabRichEditor = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactQuill, _connection, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _reactQuill2 = _interopRequireDefault(_reactQuill);

  var _connection2 = _interopRequireDefault(_connection);

  var _underscore2 = _interopRequireDefault(_underscore);

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

  var CollabRichEditor = function (_Component) {
    _inherits(CollabRichEditor, _Component);

    function CollabRichEditor(props) {
      _classCallCheck(this, CollabRichEditor);

      var _this = _possibleConstructorReturn(this, (CollabRichEditor.__proto__ || Object.getPrototypeOf(CollabRichEditor)).call(this, props));

      _this.state = {
        doc: null
      };

      // We extend the modules to add by default drag and drop of images
      _underscore2.default.extend(_this.props.modules, {
        dragAndDrop: true
      });
      return _this;
    }

    _createClass(CollabRichEditor, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.subscribeToDoc(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id || nextProps.collectionName !== this.props.collectionName) {
          this.destroy();
          this.subscribeToDoc(nextProps);
        }
      }
    }, {
      key: 'subscribeToDoc',
      value: function subscribeToDoc(props) {
        var doc = _connection2.default.get('collab_data_' + props.collectionName, props.id);
        doc.subscribe(function (err) {
          if (err) throw err;
          if (doc.type === null) {
            throw Error('No document exist with id: ' + props.id);
          }
        });

        doc.on('load', load.bind(this));
        doc.on('op', update.bind(this));
        doc.on('del', del.bind(this));

        function load() {
          this.setState({ doc: doc });
          this._editor.getEditor().updateContents(doc.data);
        }

        function update(op, source) {
          // Update only if the change comes from the server
          if (!source) {
            var editor = this._editor.getEditor();
            editor.updateContents(op);
          }
        }

        function del() {
          this.destroy();
        }
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.state.doc.unsubscribe();
        this.state.doc.destroy();
        this.setState({ doc: null });
      }
    }, {
      key: 'handleChange',
      value: function handleChange(content, delta, source, editor) {
        // If we are the one making the change
        if (source === 'user') {
          this.state.doc.submitOp(delta);
        }

        if (this.props.onChange) this.props.onChange(content, delta, source, editor);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement(_reactQuill2.default, _extends({}, this.props, {
          onChange: this.handleChange.bind(this),
          ref: function ref(_ref) {
            return _this2._editor = _ref;
          }
        }));
      }
    }]);

    return CollabRichEditor;
  }(_react.Component);

  exports.default = CollabRichEditor;


  CollabRichEditor.defaultProps = {
    modules: {}
  };

  CollabRichEditor.PropTypes = {
    docId: _propTypes2.default.string.isRequired,
    collectionName: _propTypes2.default.string.isRequired,
    onChange: _propTypes2.default.func
  };
});