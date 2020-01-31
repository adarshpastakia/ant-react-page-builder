"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _Actions = require("./Actions");

var _Col = require("./Col");

var _Context = require("./Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var minHeight = 50;

var RpbRow =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbRow, _React$Component);

  function RpbRow(props) {
    var _this;

    _classCallCheck(this, RpbRow);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RpbRow).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "refEl", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "startY", 0);

    _defineProperty(_assertThisInitialized(_this), "currentHeight", 0);

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {
      return undefined;
    });

    _defineProperty(_assertThisInitialized(_this), "state", {
      draggable: false,
      config: {
        height: minHeight
      }
    });

    _defineProperty(_assertThisInitialized(_this), "startResize", function (evt) {
      _this.startY = evt.clientY;
      var _this$state$config$he = _this.state.config.height,
          height = _this$state$config$he === void 0 ? minHeight : _this$state$config$he;
      var _ref = _this.refEl.current,
          offsetHeight = _ref.offsetHeight;
      _this.currentHeight = height < offsetHeight ? offsetHeight : height;
      document.addEventListener("mousemove", _this.resize, {
        capture: true
      });
      document.addEventListener("mouseup", _this.endResize);
    });

    _defineProperty(_assertThisInitialized(_this), "resize", function (evt) {
      var newY = evt.clientY;
      var diff = newY - _this.startY;
      _this.startY = newY;
      var config = _this.state.config;
      _this.currentHeight += diff;
      var height = _this.currentHeight < minHeight ? minHeight : _this.currentHeight;

      _this.setState(_objectSpread({}, _this.state, {
        config: _objectSpread({}, config, {
          height: height
        })
      }));

      evt.preventDefault();
    });

    _defineProperty(_assertThisInitialized(_this), "endResize", function () {
      document.removeEventListener("mousemove", _this.resize, {
        capture: true
      });
      document.removeEventListener("mouseup", _this.endResize);
      var config = _this.state.config;

      if (_this.onResize) {
        _this.onResize(config.id, config.height);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "enableDrag", function (draggable) {
      _this.setState(_objectSpread({}, _this.state, {
        draggable: draggable
      }));
    });

    if (_this.props.config) {
      _this.state = {
        config: _this.props.config
      };
    }

    return _this;
  }

  _createClass(RpbRow, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var _newProps$config = newProps.config,
          config = _newProps$config === void 0 ? {
        height: minHeight
      } : _newProps$config;
      this.setState(_objectSpread({}, this.state, {
        config: config
      }));
    }
    /**
     * Row resize handlers
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          config = _this$state.config,
          draggable = _this$state.draggable;
      var style = {
        height: "unset",
        minHeight: 50
      };
      style[config.autoHeight ? "minHeight" : "height"] = config.height || 50;
      return _react.default.createElement(_Context.RpbContextConsumer, null, function (_ref2) {
        var onRowResize = _ref2.onRowResize,
            removeObject = _ref2.removeObject,
            editing = _ref2.editing,
            setDragNode = _ref2.setDragNode;
        _this2.onResize = onRowResize;
        return _react.default.createElement("div", {
          className: "rpb-row",
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
          className: "rpb-row__overlay"
        }, _toConsumableArray(Array(12)).map(function (_, i) {
          return _react.default.createElement("div", {
            key: i
          });
        })), _react.default.createElement("span", {
          className: "rpb-resize-handle",
          onMouseDown: _this2.startResize
        }), _react.default.createElement("div", {
          className: "rpb-row__container",
          ref: _this2.refEl,
          "data-id": config.id,
          style: style
        }, config.content && config.content.map(function (config, i) {
          return _react.default.createElement(_Col.RpbCol, {
            key: i,
            config: config
          });
        }), !(config.content && config.content.length) && _react.default.createElement("span", {
          className: "rpb-empty"
        }, "Empty Row")));
      });
    }
  }]);

  return RpbRow;
}(_react.default.Component);

exports.RpbRow = RpbRow;