(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'sharedb/lib/client', 'reconnecting-websocket'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('sharedb/lib/client'), require('reconnecting-websocket'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.client, global.reconnectingWebsocket);
    global.connection = mod.exports;
  }
})(this, function (exports, _client, _reconnectingWebsocket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _client2 = _interopRequireDefault(_client);

  var _reconnectingWebsocket2 = _interopRequireDefault(_reconnectingWebsocket);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // This line makes the WebSocket connection always use port the CollabServer port.
  /**
   * Created by dario on 08.03.17.
   */
  var port = window.location.host.split(':')[1];
  var host = window.location.host.replace(port, '3000');

  var webSocket = new _reconnectingWebsocket2.default('ws://' + host);
  var connection = new _client2.default.Connection(webSocket);

  exports.default = connection;
});