(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'sharedb-string-binding', './connection'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('sharedb-string-binding'), require('./connection'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.sharedbStringBinding, global.connection);
    global.CollabEditor = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _sharedbStringBinding, _connection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _sharedbStringBinding2 = _interopRequireDefault(_sharedbStringBinding);

  var _connection2 = _interopRequireDefault(_connection);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var CollabEditor = function (_Component) {
    _inherits(CollabEditor, _Component);

    function CollabEditor(props) {
      _classCallCheck(this, CollabEditor);

      var _this = _possibleConstructorReturn(this, (CollabEditor.__proto__ || Object.getPrototypeOf(CollabEditor)).call(this, props));

      _this.state = {
        doc: null
      };
      return _this;
    }

    _createClass(CollabEditor, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.subscribeToDoc(this.props);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.id !== this.props.id || nextProps.collectionName !== this.props.collectionName) {
          this.destroyBinding();
          this.subscribeToDoc(nextProps);
        }
      }
    }, {
      key: 'subscribeToDoc',
      value: function subscribeToDoc(props) {
        var doc = _connection2.default.get('collab_data_' + props.collectionName, props.id);
        doc.subscribe(function (err) {
          if (err) console.log(err);
          if (doc.type === null) {
            throw Error('No document exist with id: ' + props.id);
          }
        });

        doc.on('load', load.bind(this));
        doc.on('del', del.bind(this));

        function load() {
          this.setState({ doc: doc }, this.createBinding);
        }

        function del() {
          this.destroyBinding();
        }
      }
    }, {
      key: 'createBinding',
      value: function createBinding() {
        this.binding = new _sharedbStringBinding2.default(this._textarea, this.state.doc);
        this.binding.setup();
      }
    }, {
      key: 'destroyBinding',
      value: function destroyBinding() {
        this.state.doc.unsubscribe();
        this.state.doc.destroy();
        this.binding.destroy();
        this.setState({ doc: null });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        return _react2.default.createElement('textarea', {
          onChange: this.props.onChange,
          ref: function ref(_ref) {
            return _this2._textarea = _ref;
          },
          className: this.props.classNames,
          rows: this.props.rows
        });
      }
    }]);

    return CollabEditor;
  }(_react.Component);

  exports.default = CollabEditor;


  CollabEditor.defaultProps = {
    classNames: 'form-control'
  };

  CollabEditor.PropTypes = {
    id: _propTypes2.default.string.isRequired,
    collectionName: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string,
    rows: _propTypes2.default.number,
    onChange: _propTypes2.default.func
  };
});