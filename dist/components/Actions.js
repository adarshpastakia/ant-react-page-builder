"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbActions = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RpbActions = function RpbActions(_ref) {
  var _ref$canMove = _ref.canMove,
      canMove = _ref$canMove === void 0 ? false : _ref$canMove,
      _ref$canDelete = _ref.canDelete,
      canDelete = _ref$canDelete === void 0 ? true : _ref$canDelete,
      _ref$canExpand = _ref.canExpand,
      canExpand = _ref$canExpand === void 0 ? false : _ref$canExpand,
      _ref$hasSettings = _ref.hasSettings,
      hasSettings = _ref$hasSettings === void 0 ? false : _ref$hasSettings,
      isExpanded = _ref.isExpanded,
      actionRenderer = _ref.actionRenderer,
      onToggleExpand = _ref.onToggleExpand,
      onDelete = _ref.onDelete,
      enableDrag = _ref.enableDrag,
      children = _ref.children;
  return _react.default.createElement("span", {
    className: "rpb-actions",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }, actionRenderer && actionRenderer(), canMove && _react.default.createElement("a", {
    className: "move",
    onMouseEnter: function onMouseEnter() {
      return enableDrag(true);
    },
    onMouseLeave: function onMouseLeave() {
      return enableDrag(false);
    }
  }, _react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, _react.default.createElement("path", {
    d: "M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z"
  }))), hasSettings && _react.default.createElement("a", {
    className: "settings"
  }, _react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, _react.default.createElement("path", {
    d: "M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"
  })), _react.default.createElement("div", {
    className: "rpb-actions__settings"
  }, children)), canExpand && _react.default.createElement("a", {
    onClick: onToggleExpand
  }, _react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, _react.default.createElement("path", {
    d: isExpanded ? "M19.5,3.09L15,7.59V4H13V11H20V9H16.41L20.91,4.5L19.5,3.09M4,13V15H7.59L3.09,19.5L4.5,20.91L9,16.41V20H11V13H4Z" : "M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"
  }))), canDelete && _react.default.createElement("a", {
    onClick: onDelete
  }, _react.default.createElement("svg", {
    width: "24",
    height: "24",
    viewBox: "0 0 24 24"
  }, _react.default.createElement("path", {
    d: "M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z"
  }))));
};

exports.RpbActions = RpbActions;