(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './CollabServer', 'underscore'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./CollabServer'), require('underscore'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.CollabServer, global.underscore);
    global.CollabCollection = mod.exports;
  }
})(this, function (exports, _CollabServer, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _CollabServer2 = _interopRequireDefault(_CollabServer);

  var _underscore2 = _interopRequireDefault(_underscore);

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

  var CollabCollection = function () {
    /**
     * @param {Object} collectionName The name of the collection to bind to ShareDB
     */
    function CollabCollection(collectionName) {
      _classCallCheck(this, CollabCollection);

      var backend = _CollabServer2.default.backend;
      if (backend === null) {
        throw new Error('CollabCollection: You should start the CollabServer before using the model.');
      }

      this.connection = backend.connect();
      this.collectionName = 'collab_data_' + collectionName;
    }

    /**
     * Creates a new document.
     *
     * @param {String} id The document id
     * @param {String} data The document initial data string.
     * @returns {Doc} The Document created
     */


    _createClass(CollabCollection, [{
      key: 'create',
      value: function create(id) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var doc = this.connection.get(this.collectionName, id);
        doc.fetch(function (err) {
          if (err) throw err;
          if (doc.type === null) {
            doc.create(data, function (err) {
              if (err) throw err;
            });
          }
        });
        return doc;
      }
    }, {
      key: 'createRichText',
      value: function createRichText(id) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        var doc = this.connection.get(this.collectionName, id);
        doc.fetch(function (err) {
          if (err) throw err;
          if (doc.type === null) {
            doc.create([{ insert: data }], 'rich-text', function (err) {
              if (err) throw err;
              return doc;
            });
          }
        });

        return doc;
      }
    }, {
      key: 'createForm',
      value: function createForm(id) {
        var schema = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

        function createString(schemaField) {
          return schemaField.default !== undefined ? schemaField.default : '';
        }
        function createInteger(schemaField) {
          return schemaField.default !== undefined ? schemaField.default : 0;
        }
        function createBoolean(schemaField) {
          return schemaField.default !== undefined;
        }

        function createObject(schemaField) {
          var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          _underscore2.default.each(schemaField.properties, function (value, key) {
            var prop = {};
            switch (value.type) {
              case 'string':
                prop[key] = createString(value);
                break;
              case 'boolean':
                prop[key] = createBoolean(value);
                break;
              case 'integer':
              case 'number':
                prop[key] = createInteger(value);
                break;
              case 'object':
                prop[key] = createObject(value);
                break;
              default:
                callback(Error('CollabCollection: definitions, arrays and nested objects are not yet supported'));
            }

            _underscore2.default.extend(data, prop);
          });

          return data;
        }

        var doc = this.connection.get(this.collectionName, id);
        doc.fetch(function (err) {
          if (err) throw err;
          // If the document doesn't already exist, we create it following the schema.
          if (doc.type === null) {
            var data = {};
            switch (schema.type) {
              case 'string':
                data = createString(schema);
                break;
              case 'number':
              case 'integer':
                data = createInteger(schema);
                break;
              case 'boolean':
                data = createBoolean(schema);
                break;
              case 'object':
                data = createObject(schema, data);
                break;
              default:
                callback(Error('CollabCollection: array type is not yet supported'));
            }

            doc.create({ schema: schema, data: data }, function (err) {
              if (err) throw err;
              return doc;
            });
          }
        });

        return doc;
      }
    }, {
      key: 'remove',
      value: function remove(id) {
        var doc = this.connection.get(this.collectionName, id);
        doc.subscribe(function (err) {
          if (err) throw err;
          doc.del();
        });
      }
    }]);

    return CollabCollection;
  }();

  exports.default = CollabCollection;
});