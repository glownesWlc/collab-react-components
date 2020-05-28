(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'sharedb/lib/client', 'rich-text', './CollabForm', './CollabEditor', './CollabRichEditor', 'react-quill', './DragAndDropModule'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('sharedb/lib/client'), require('rich-text'), require('./CollabForm'), require('./CollabEditor'), require('./CollabRichEditor'), require('react-quill'), require('./DragAndDropModule'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.client, global.richText, global.CollabForm, global.CollabEditor, global.CollabRichEditor, global.reactQuill, global.DragAndDropModule);
    global.index = mod.exports;
  }
})(this, function (exports, _client, _richText, _CollabForm, _CollabEditor, _CollabRichEditor, _reactQuill, _DragAndDropModule) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CollabRichEditor = exports.CollabEditor = exports.CollabForm = undefined;

  var _client2 = _interopRequireDefault(_client);

  var _richText2 = _interopRequireDefault(_richText);

  var _CollabForm2 = _interopRequireDefault(_CollabForm);

  var _CollabEditor2 = _interopRequireDefault(_CollabEditor);

  var _CollabRichEditor2 = _interopRequireDefault(_CollabRichEditor);

  var _DragAndDropModule2 = _interopRequireDefault(_DragAndDropModule);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Register rich-text type on the client
  _client2.default.types.register(_richText2.default.type);

  // Register module Drag and Drop into Quill
  /**
   * Created by dario on 11.05.17.
   */

  _reactQuill.Quill.register('modules/dragAndDrop', _DragAndDropModule2.default);

  exports.CollabForm = _CollabForm2.default;
  exports.CollabEditor = _CollabEditor2.default;
  exports.CollabRichEditor = _CollabRichEditor2.default;
});