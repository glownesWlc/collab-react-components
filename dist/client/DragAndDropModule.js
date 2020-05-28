(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.DragAndDropModule = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  var DragAndDropModule = function () {
    function DragAndDropModule(quill) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, DragAndDropModule);

      // save the quill reference
      this.quill = quill;
      // bind handlers to this instance
      this.handleDrop = this.handleDrop.bind(this);
      this.handlePaste = this.handlePaste.bind(this);
      // listen for drop and paste events
      this.quill.root.addEventListener('drop', this.handleDrop, false);
      this.quill.root.addEventListener('paste', this.handlePaste, false);
    }

    _createClass(DragAndDropModule, [{
      key: 'handleDrop',
      value: function handleDrop(evt) {
        evt.preventDefault();
        if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
          if (document.caretRangeFromPoint) {
            var selection = document.getSelection();
            var range = document.caretRangeFromPoint(evt.clientX, evt.clientY);
            if (selection && range) {
              selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
            }
          }
          this.readFiles(evt.dataTransfer.files, this.insert.bind(this));
        }
      }
    }, {
      key: 'handlePaste',
      value: function handlePaste(evt) {
        var _this = this;

        if (evt.clipboardData && evt.clipboardData.items && evt.clipboardData.items.length) {
          this.readFiles(evt.clipboardData.items, function (dataUrl) {
            var selection = _this.quill.getSelection();
            if (selection) {
              // we must be in a browser that supports pasting (like Firefox)
              // so it has already been placed into the editor
            } else {
              // otherwise we wait until after the paste when this.quill.getSelection()
              // will return a valid index
              setTimeout(function () {
                return _this.insert(dataUrl);
              }, 0);
            }
          });
        }
      }
    }, {
      key: 'insert',
      value: function insert(dataUrl) {
        var index = (this.quill.getSelection() || {}).index || this.quill.getLength();
        this.quill.insertEmbed(index, 'image', dataUrl, 'user');
      }
    }, {
      key: 'readFiles',
      value: function readFiles(files, callback) {
        // check each file for an image
        [].forEach.call(files, function (file) {
          if (!file.type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp|vnd\.microsoft\.icon)/i)) {
            // file is not an image
            // Note that some file formats such as psd start with image/* but are not readable
            return;
          }
          // set up file reader
          var reader = new FileReader();
          reader.onload = function (evt) {
            callback(evt.target.result);
          };
          // read the clipboard item or file
          var blob = file.getAsFile ? file.getAsFile() : file;
          if (blob instanceof Blob) {
            reader.readAsDataURL(blob);
          }
        });
      }
    }]);

    return DragAndDropModule;
  }();

  exports.default = DragAndDropModule;
});