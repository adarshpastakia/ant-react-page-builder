"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbTile = void 0;

var _react = _interopRequireDefault(require("react"));

var _Actions = require("./Actions");

var _Context = require("./Context");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var RpbTile =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbTile, _React$Component);

  function RpbTile(props) {
    var _this;

    _classCallCheck(this, RpbTile);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RpbTile).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", {
      expanded: false,
      draggable: false,
      config: {
        background: true,
        expandable: false
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onToggleExpand", function () {
      return _this.setState({
        expanded: !_this.state.expanded
      });
    });

    _defineProperty(_assertThisInitialized(_this), "enableDrag", function (draggable) {
      _this.setState(_objectSpread({}, _this.state, {
        draggable: draggable
      }));
    });

    if (_this.props.config) {
      _this.state = {
        expanded: false,
        draggable: false,
        config: _this.props.config
      };
    }

    return _this;
  }

  _createClass(RpbTile, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var _newProps$config = newProps.config,
          config = _newProps$config === void 0 ? {
        background: true,
        expandable: false
      } : _newProps$config;
      this.setState(_objectSpread({}, this.state, {
        config: config
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var id = this.props.config.id;
      var _this$state = this.state,
          expanded = _this$state.expanded,
          config = _this$state.config,
          draggable = _this$state.draggable;
      var classes = ["lib-tile"];
      if (expanded) classes.push("lib-tile--expanded");
      var contentClasses = ["lib-tile__content"];
      if (config.background !== false) contentClasses.push("lib-tile--background");
      return _react.default.createElement(_Context.RpbContextConsumer, null, function (_ref) {
        var removeObject = _ref.removeObject,
            findWidget = _ref.findWidget,
            editing = _ref.editing,
            renderer = _ref.renderer,
            iconRenderer = _ref.iconRenderer,
            titleRenderer = _ref.titleRenderer,
            actionRenderer = _ref.actionRenderer,
            onTileUpdate = _ref.onTileUpdate,
            setDragNode = _ref.setDragNode;
        var widget = findWidget(config.widgetId);

        var innerActionRenderer = function innerActionRenderer() {
          return actionRenderer && actionRenderer(widget);
        };

        return _react.default.createElement("div", {
          draggable: draggable,
          onDragStart: function onDragStart(e) {
            setDragNode({
              type: config.type,
              move: config.id
            });
            e.stopPropagation();
            return false;
          },
          className: classes.join(" "),
          "data-show-title": editing ? false : config.showTitle,
          "data-id": config.widgetId
        }, !editing && _react.default.createElement("div", {
          className: "rpb-tile__title"
        }, titleRenderer ? titleRenderer(widget) : widget.title), _react.default.createElement("div", {
          className: contentClasses.join(" ")
        }, !editing && renderer ? renderer(widget.config) : null, editing && _react.default.createElement("div", {
          className: "rpb-tile__placeholder"
        }, _react.default.createElement("div", {
          className: "rpb-tile__placeholder--icon"
        }, iconRenderer ? iconRenderer(widget) : widget.icon), _react.default.createElement("div", null, titleRenderer ? titleRenderer(widget) : widget.title), _react.default.createElement("p", null, "Click to Edit"))), _react.default.createElement(_Actions.RpbActions, {
          isExpanded: expanded,
          hasSettings: editing,
          canMove: editing,
          canExpand: !editing && !!config.expandable,
          canDelete: editing || !!config.closeable,
          onToggleExpand: _this2.onToggleExpand,
          enableDrag: _this2.enableDrag,
          onDelete: function onDelete() {
            return removeObject(config.id);
          },
          actionRenderer: !!actionRenderer && !editing ? innerActionRenderer : undefined
        }, editing && _react.default.createElement(_react.default.Fragment, null, _react.default.createElement("div", null, _react.default.createElement("ul", null, _react.default.createElement("label", null, "Expandable"), _react.default.createElement("li", {
          onClick: function onClick() {
            return onTileUpdate(id, "expandable", true);
          },
          className: config.expandable ? "active" : ""
        }, "Yes"), _react.default.createElement("li", {
          onClick: function onClick() {
            return onTileUpdate(id, "expandable", false);
          },
          className: !config.expandable ? "active" : ""
        }, "No"))), _react.default.createElement("div", null, _react.default.createElement("ul", null, _react.default.createElement("label", null, "Background"), _react.default.createElement("li", {
          onClick: function onClick() {
            return onTileUpdate(id, "background", true);
          },
          className: config.background ? "active" : ""
        }, "Fill"), _react.default.createElement("li", {
          onClick: function onClick() {
            return onTileUpdate(id, "background", false);
          },
          className: !config.background ? "active" : ""
        }, "None"))))));
      });
    }
  }]);

  return RpbTile;
}(_react.default.Component);

exports.RpbTile = RpbTile;