(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'http', 'sharedb', 'sharedb-mongo', 'rich-text', 'ws', 'websocket-json-stream'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('http'), require('sharedb'), require('sharedb-mongo'), require('rich-text'), require('ws'), require('websocket-json-stream'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.http, global.sharedb, global.sharedbMongo, global.richText, global.ws, global.websocketJsonStream);
    global.CollabServer = mod.exports;
  }
})(this, function (exports, _http, _sharedb, _sharedbMongo, _richText, _ws, _websocketJsonStream) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _http2 = _interopRequireDefault(_http);

  var _sharedb2 = _interopRequireDefault(_sharedb);

  var _sharedbMongo2 = _interopRequireDefault(_sharedbMongo);

  var _richText2 = _interopRequireDefault(_richText);

  var _ws2 = _interopRequireDefault(_ws);

  var _websocketJsonStream2 = _interopRequireDefault(_websocketJsonStream);

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

  var CollabServer = {};

  // We define the default options in case they are not overriden
  var defaultOptions = {
    port: 8080,
    db: {
      type: 'in-memory',
      url: null
    }
  };

  CollabServer.start = function () {
    var app = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // We merge the options defined by the user
    CollabServer.options = _extends({}, defaultOptions, options);

    var server = _http2.default.createServer(app);
    var db = null;
    if (CollabServer.options.db.type === 'mongo') {
      db = CollabServer.options.db.url ? (0, _sharedbMongo2.default)(CollabServer.options.db.url) : {};
      console.log('CollabServer: Using MongoDB adapter');
    } else {
      console.log('CollabServer: No Database specified, falling back to In Memory');
    }

    // Create the ShareDB backend (that will need to be exported)
    _sharedb2.default.types.register(_richText2.default.type);
    CollabServer.backend = new _sharedb2.default({ db: db });

    // Create the Websocket server
    new _ws2.default.Server({ server: server }).on('connection', function (ws) {
      CollabServer.backend.listen(new _websocketJsonStream2.default(ws));
      console.log('New socket client on CollabServer instance');
    });

    server.listen(CollabServer.options.port, function (err) {
      if (err) throw err;
      console.log('CollabServer: Server listening on port ' + CollabServer.options.port);
    });
  };

  CollabServer.stop = function () {
    if (CollabServer.backend === null) {
      console.log('CollabServer: No server instance to close. Be sure you started a server');
      return;
    }

    CollabServer.backend.close();
    console.log('CollabServer: Server stopped');
  };

  exports.default = CollabServer;
});