"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onDrop = exports.onDragLeave = exports.onDragOver = exports.getNodeConfig = exports.getNearest = exports.classes = void 0;

var _pageBuilder = require("../page-builder");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ghost = undefined;
var currentParent;
var classes;
/**
 * generate element id
 */

exports.classes = classes;

(function (classes) {
  classes["rowParent"] = "rpb-row";
  classes["row"] = "rpb-row__container";
  classes["col"] = "rpb-col__container";
  classes["tile"] = "rpb-tile";
  classes["head"] = "rpb-head";
  classes["ghost"] = "rpb-ghost";
  classes["container"] = "rpb-container";
})(classes || (exports.classes = classes = {}));

var generateId = function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};
/**
 * get config from drag object
 */


var getGhost = function getGhost(type) {
  var div = document.createElement("div");
  div.classList.add(classes.ghost);
  if (type === _pageBuilder.PageBuilderTypes.ROW) div.classList.add("lib-row");
  if (type === _pageBuilder.PageBuilderTypes.COL) div.classList.add("lib-col");
  if (type === _pageBuilder.PageBuilderTypes.TILE) div.classList.add("lib-tile");
  if (type === _pageBuilder.PageBuilderTypes.HEAD) div.classList.add("lib-head");
  return div;
};

var canAllowDrop = function canAllowDrop(target, type) {
  if (type === _pageBuilder.PageBuilderTypes.ROW || type === _pageBuilder.PageBuilderTypes.HEAD) {
    target = getNearestSiblingForRow(target);

    if (target.classList.contains(classes.col) && target.firstElementChild && target.firstElementChild.classList.contains(classes.tile)) {
      return false;
    }

    if (target.classList.contains(classes.col) && getParentRows(target).length >= 2) {
      return false;
    }

    return target.classList.contains(classes.container) || target.classList.contains(classes.row) || target.classList.contains(classes.col) || target.classList.contains(classes.tile) || target.classList.contains(classes.ghost);
  }

  if (type === _pageBuilder.PageBuilderTypes.COL) {
    target = getNearestSiblingForColumn(target);
    return target.classList.contains(classes.row) || target.classList.contains(classes.col) || target.classList.contains(classes.tile) || target.classList.contains(classes.ghost);
  }

  if (type === _pageBuilder.PageBuilderTypes.TILE) {
    var firstChild = target.firstElementChild;

    if (target.classList.contains(classes.col) && firstChild) {
      return !(firstChild.classList.contains(classes.rowParent) || firstChild.classList.contains(classes.tile));
    }

    return target.classList.contains(classes.col) || target.classList.contains(classes.ghost);
  }

  return false;
};
/** @internal */


var getNearest = function getNearest(target, className) {
  while (target && !target.classList.contains(className)) {
    target = target.parentElement;
  }

  return target;
};

exports.getNearest = getNearest;

var getParentRows = function getParentRows(target) {
  var row;
  var rows = [];

  while (row = getNearest(target, classes.row)) {
    target = row.parentElement;
    rows.push(row);
  }

  return rows;
};

var getNearestTile = function getNearestTile(target) {
  return getNearest(target, classes.tile);
};

var getNearestSiblingForColumn = function getNearestSiblingForColumn(target) {
  var tile = getNearestTile(target);
  return tile ? tile.parentElement : target;
};

var getNearestSiblingForRow = function getNearestSiblingForRow(target) {
  var tile = getNearestTile(target);
  return tile ? getNearest(tile, classes.row) : target;
};

var calculateNewRow = function calculateNewRow(evt, ghost) {
  var currentTarget = currentParent = getNearestSiblingForRow(evt.target);
  var after = true;
  var isRow = false;

  if (currentTarget.classList.contains(classes.row)) {
    var box = currentTarget.getBoundingClientRect();
    after = box.top + box.height / 2 < evt.clientY;
    currentTarget = currentTarget.parentElement;
    currentParent = currentTarget.parentElement;
    isRow = true;
  }

  if (isRow && !after) {
    currentParent.insertBefore(ghost, currentTarget);
  } else if (isRow && after && currentTarget.nextElementSibling) {
    currentParent.insertBefore(ghost, currentTarget.nextElementSibling);
  } else {
    currentParent.appendChild(ghost);
  }

  evt.preventDefault();
};

var calculateNewCol = function calculateNewCol(evt, ghost) {
  var currentTarget = currentParent = getNearestSiblingForColumn(evt.target);
  var after = true;
  var isCol = false;

  if (currentTarget.classList.contains(classes.col)) {
    var box = currentTarget.getBoundingClientRect();
    after = box.left + box.width / 2 < evt.clientX;
    currentParent = getNearest(currentParent, classes.row);
    currentTarget = currentTarget.parentElement;
    isCol = true;
  }

  if (isCol && !after) {
    currentParent.insertBefore(ghost, currentTarget);
  } else if (isCol && after && currentTarget.nextElementSibling) {
    currentParent.insertBefore(ghost, currentTarget.nextElementSibling);
  } else {
    currentParent.appendChild(ghost);
  }

  evt.preventDefault();
};
/** @internal */


var getNodeConfig = function getNodeConfig(dragging) {
  var minHeight = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 120;
  var newConfig = {
    type: dragging.type,
    id: generateId()
  };
  if (dragging.type === _pageBuilder.PageBuilderTypes.TILE) return _objectSpread({}, newConfig, {
    expandable: true,
    background: "fill",
    widgetId: dragging.widgetId
  });else if (dragging.type === _pageBuilder.PageBuilderTypes.COL) return _objectSpread({}, newConfig, {
    colSpan: 3
  });else if (dragging.type === _pageBuilder.PageBuilderTypes.ROW) return _objectSpread({}, newConfig, {
    height: minHeight
  });else return newConfig;
};
/**
 * Element drag over
 */

/** @internal */


exports.getNodeConfig = getNodeConfig;

var onDragOver = function onDragOver(evt, dragging) {
  var target = evt.target;

  if (target.classList.contains(classes.ghost)) {
    evt.preventDefault();
  } else if (canAllowDrop(target, dragging.type)) {
    if (!ghost) {
      ghost = getGhost(dragging.type);
    }

    if (dragging.type === _pageBuilder.PageBuilderTypes.ROW || dragging.type === _pageBuilder.PageBuilderTypes.HEAD) {
      calculateNewRow(evt, ghost);
    }

    if (dragging.type === _pageBuilder.PageBuilderTypes.COL) {
      calculateNewCol(evt, ghost);
    }

    if (dragging.type === _pageBuilder.PageBuilderTypes.TILE) {
      currentParent = target;
      target.appendChild(ghost);
      evt.preventDefault();
    }
  }
};
/** @internal */


exports.onDragOver = onDragOver;

var onDragLeave = function onDragLeave(evt, dragging) {
  var target = evt.relatedTarget;

  if (target && ghost && !canAllowDrop(target, dragging.type)) {
    ghost.remove();
    ghost = undefined;
  }
};
/** @internal */


exports.onDragLeave = onDragLeave;

var onDrop = function onDrop(_, dragging, appendNewNode, moveExistingNode) {
  // @ts-ignore
  var index = _toConsumableArray(currentParent.children).indexOf(ghost);

  if (dragging.move) {
    moveExistingNode(currentParent.dataset.id || "", index, dragging.move);
  } else {
    appendNewNode(currentParent.dataset.id || "", index, getNodeConfig(dragging));
  }

  if (ghost) {
    ghost.remove();
    ghost = undefined;
  }
};

exports.onDrop = onDrop;