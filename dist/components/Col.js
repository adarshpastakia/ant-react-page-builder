"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbCol = void 0;

var _react = _interopRequireDefault(require("react"));

var _pageBuilder = require("../page-builder");

var _dnd = require("../utils/dnd");

var _Actions = require("./Actions");

var _Context = require("./Context");

var _Row = require("./Row");

var _Tile = require("./Tile");

var _Head = require("./Head");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RpbCol =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbCol, _React$Component);

  function RpbCol(props) {
    var _this;

    _classCallCheck(this, RpbCol);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RpbCol).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      draggable: false,
      config: {
        colSpan: 1
      }
    });

    _defineProperty(_assertThisInitialized(_this), "refEl", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "minWidth", 0);

    _defineProperty(_assertThisInitialized(_this), "startResize", function () {
      (0, _dnd.getNearest)(_this.refEl.current, "lib-row").classList.add("child-resizing");
      _this.minWidth = _this.refEl.current.parentElement.parentElement.offsetWidth / 12;
      document.addEventListener("mousemove", _this.resize);
      document.addEventListener("mouseup", _this.endResize);
    });

    _defineProperty(_assertThisInitialized(_this), "resize", function (evt) {
      var newX = evt.clientX;
      var config = _this.state.config;

      var box = _this.refEl.current.getBoundingClientRect();

      var colSpan = Math.floor((newX - (box.left - _this.minWidth)) / _this.minWidth) || 1;
      if (colSpan > 12) colSpan = 12;

      _this.setState(_objectSpread({}, _this.state, {
        config: _objectSpread({}, config, {
          colSpan: colSpan
        })
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "endResize", function () {
      (0, _dnd.getNearest)(_this.refEl.current, "lib-row").classList.remove("child-resizing");
      document.removeEventListener("mousemove", _this.resize);
      document.removeEventListener("mouseup", _this.endResize);
      var config = _this.state.config;

      if (_this.onResize) {
        _this.onResize(config.id, config.colSpan);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "enableDrag", function (draggable) {
      _this.setState(_objectSpread({}, _this.state, {
        draggable: draggable
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      return undefined;
    });

    if (_this.props.config) {
      _this.state = {
        config: _this.props.config
      };
    }

    return _this;
  }

  _createClass(RpbCol, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var _newProps$config = newProps.config,
          config = _newProps$config === void 0 ? {
        colSpan: 1
      } : _newProps$config;
      this.setState(_objectSpread({}, this.state, {
        config: config
      }));
    }
    /**
     * Column resize handlers
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          config = _this$state.config,
          draggable = _this$state.draggable;
      return _react.default.createElement(_Context.RpbContextConsumer, null, function (_ref) {
        var onColResize = _ref.onColResize,
            removeObject = _ref.removeObject,
            setDragNode = _ref.setDragNode,
            editing = _ref.editing;
        _this2.onResize = onColResize;
        return _react.default.createElement("div", {
          className: "rpb-col",
          style: {
            gridColumnEnd: "span ".concat(config.colSpan)
          },
          draggable: draggable,
          onDragStart: function onDragStart(e) {
            setDragNode({
              type: config.type,
              move: config.id
            });
            e.stopPropagation();
            return false;
          }
        }, _react.default.createElement(_Actions.RpbActions, {
          onDelete: function onDelete() {
            return removeObject(config.id);
          },
          canMove: editing,
          enableDrag: _this2.enableDrag
        }), _react.default.createElement("span", {
          className: "rpb-resize-handle",
          onMouseDown: _this2.startResize
        }), _react.default.createElement("div", {
          className: "rpb-col__container",
          ref: _this2.refEl,
          "data-id": config.id,
          "data-has-row": config.content && config.content.length > 1
        }, config.content && config.content.map(function (config, i) {
          if (config.type === _pageBuilder.PageBuilderTypes.ROW) return _react.default.createElement(_Row.RpbRow, {
            key: i,
            config: config
          });else if (config.type === _pageBuilder.PageBuilderTypes.HEAD) return _react.default.createElement(_Head.RpbHead, {
            key: i,
            config: config
          });else if (config.type === _pageBuilder.PageBuilderTypes.TILE) return _react.default.createElement(_Tile.RpbTile, {
            key: i,
            config: config
          });else return null;
        }), !(config.content && config.content.length) && _react.default.createElement("div", {
          className: "rpb-empty"
        }, _react.default.createElement("p", null, "Drag Visualization Tile"), _react.default.createElement("p", {
          className: "rpb-divider"
        }, _react.default.createElement("span", null, "OR")), _react.default.createElement("p", null, "Create New Visualization"))));
      });
    }
  }]);

  return RpbCol;
}(_react.default.Component);

exports.RpbCol = RpbCol;