"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PageBuilder = require("./PageBuilder");

Object.keys(_PageBuilder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _PageBuilder[key];
    }
  });
});

var _pageBuilder = require("./page-builder");

Object.keys(_pageBuilder).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _pageBuilder[key];
    }
  });
});