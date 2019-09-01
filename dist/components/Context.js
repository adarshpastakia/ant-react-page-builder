"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbContextProvider = exports.RpbContextConsumer = void 0;

var _react = _interopRequireWildcard(require("react"));

var _pageBuilder = require("../page-builder");

var _logger = require("../utils/logger");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var RpbContext = (0, _react.createContext)({});
var RpbContextConsumer = RpbContext.Consumer;
exports.RpbContextConsumer = RpbContextConsumer;

var RpbContextProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbContextProvider, _React$Component);

  function RpbContextProvider(props) {
    var _this;

    _classCallCheck(this, RpbContextProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RpbContextProvider).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "onRowResize", function (id, height) {
      var _this$state = _this.state,
          layout = _this$state.layout,
          widgets = _this$state.widgets;
      var parent = findNode(layout, id);

      if (parent) {
        parent.height = height;
      }

      _this.fireChange(layout, widgets);
    });

    _defineProperty(_assertThisInitialized(_this), "onColResize", function (id, colSpan) {
      var _this$state2 = _this.state,
          layout = _this$state2.layout,
          widgets = _this$state2.widgets;
      var parent = findNode(layout, id);

      if (parent) {
        parent.colSpan = colSpan;
      }

      _this.fireChange(layout, widgets);
    });

    _defineProperty(_assertThisInitialized(_this), "onTileUpdate", function (id, key, value) {
      var _this$state3 = _this.state,
          layout = _this$state3.layout,
          widgets = _this$state3.widgets;
      var parent = findNode(layout, id);

      if (parent) {
        parent[key] = value;
      }

      _this.fireChange(layout, widgets);
    });

    _defineProperty(_assertThisInitialized(_this), "onHeadEdited", function (id, text) {
      var _this$state4 = _this.state,
          layout = _this$state4.layout,
          widgets = _this$state4.widgets;
      var parent = findNode(layout, id);

      if (parent) {
        parent.text = text;
      }

      _this.fireChange(layout, widgets);
    });

    _defineProperty(_assertThisInitialized(_this), "setDragNode", function (dragging) {
      _this.setState(_objectSpread({}, _this.state, {
        dragging: dragging
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "findWidget", function (id) {
      var widget = _this.state.widgets ? _this.state.widgets.find(function (w) {
        return w.id === id;
      }) : null;
      widget = widget || (_this.props.widgetList ? _this.props.widgetList.find(function (w) {
        return w.id === id;
      }) : null);
      return widget ? widget : {};
    });

    _defineProperty(_assertThisInitialized(_this), "moveExistingNode", function (parentId, index, moveId) {
      var _this$state5 = _this.state,
          layout = _this$state5.layout,
          widgets = _this$state5.widgets;

      var newObject = _objectSpread({}, findNode(layout, moveId));

      var newLayout = removeObject(layout, moveId);

      if (newObject) {
        if (parentId) {
          var parent = findNode(newLayout, parentId);

          if (parent) {
            if (!parent.content) parent.content = [];
            if (index > -1) parent.content.splice(index, 0, newObject);else parent.content.push(newObject);
          }
        } else {
          newLayout.splice(index, 0, newObject);
        }

        _this.fireChange(newLayout, widgets);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "appendNewNode", function (parentId, index, newObject, newWidget) {
      var _this$state6 = _this.state,
          layout = _this$state6.layout,
          widgets = _this$state6.widgets;

      if (parentId) {
        var parent = findNode(layout, parentId);

        if (parent) {
          if (!parent.content) parent.content = [];
          if (index > -1) parent.content.splice(index, 0, newObject);else parent.content.push(newObject);
        }
      } else {
        layout.splice(index, 0, newObject);
      }

      if (newWidget) {
        widgets.push(newWidget);
      } else if (newObject.type === _pageBuilder.PageBuilderTypes.TILE) {
        var _widget = _this.findWidget(newObject.widgetId);

        if (!widgets.includes(_widget)) {
          widgets.push(_widget);
        }
      }

      _this.fireChange(layout, widgets);
    });

    _defineProperty(_assertThisInitialized(_this), "removeObject", function (id) {
      var _this$state7 = _this.state,
          layout = _this$state7.layout,
          widgets = _this$state7.widgets;

      _logger.Logger.info("Current Layout", layout);

      var newConfig = removeObject(layout, id);
      var newWidgets = getWidgets(newConfig, widgets);

      _logger.Logger.info("New Layout", newConfig);

      _this.fireChange(newConfig, newWidgets);
    });

    _this.state = {
      dragging: undefined,
      editing: !!_this.props.editing,
      layout: _toConsumableArray(_this.props.layout),
      widgets: _toConsumableArray(_this.props.widgets)
    };
    return _this;
  }

  _createClass(RpbContextProvider, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      var newState = _objectSpread({}, this.state);

      if (this.props.layout !== newProps.layout) {
        newState = _objectSpread({}, newState, {
          layout: _toConsumableArray(newProps.layout)
        });
      }

      if (this.props.widgets !== newProps.widgets) {
        newState = _objectSpread({}, newState, {
          widgets: _toConsumableArray(newProps.widgets)
        });
      }

      if (this.props.editing !== newProps.editing) {
        newState = _objectSpread({}, newState, {
          editing: !!newProps.editing
        });
      }

      this.setState(newState);
    }
  }, {
    key: "fireChange",
    value: function fireChange(layout, widgets) {
      _logger.Logger.info("Layout Changed", layout);

      _logger.Logger.info("Widgets Changed", widgets);

      this.setState(_objectSpread({}, this.state, {
        layout: layout,
        widgets: widgets
      }));

      if (this.props.onChange) {
        this.props.onChange(layout, widgets);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var initialContext = {
        onRowResize: this.onRowResize,
        onColResize: this.onColResize,
        onHeadEdited: this.onHeadEdited,
        onTileUpdate: this.onTileUpdate,
        setDragNode: this.setDragNode,
        appendNewNode: this.appendNewNode,
        removeObject: this.removeObject,
        moveExistingNode: this.moveExistingNode,
        findWidget: this.findWidget,
        renderer: this.props.renderer,
        iconRenderer: this.props.iconRenderer,
        titleRenderer: this.props.titleRenderer,
        actionRenderer: this.props.actionRenderer
      };
      return _react.default.createElement(RpbContext.Provider, {
        value: _objectSpread({}, this.state, {}, initialContext)
      }, this.props.children);
    }
  }]);

  return RpbContextProvider;
}(_react.default.Component);

exports.RpbContextProvider = RpbContextProvider;

var findNode = function findNode(list, id) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      if (node.id === id) {
        return node;
      } else if (node.content) {
        var innerNode = findNode(node.content, id);

        if (innerNode) {
          return innerNode;
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return null;
};

var removeObject = function removeObject(list, id) {
  return list.filter(function (l) {
    l.content ? l.content = removeObject(l.content, id) : undefined;
    return l.id !== id;
  });
};

var getWidgets = function getWidgets(list, widgets) {
  return list.reduce(function (n, l) {
    if (l.content) n.push.apply(n, _toConsumableArray(getWidgets(l.content, widgets)));

    if (l.type === _pageBuilder.PageBuilderTypes.TILE) {
      var _widget2 = widgets.find(function (w) {
        return w.id === l.widgetId;
      });

      if (_widget2 && !n.includes(_widget2)) n.push(_widget2);
    }

    return n;
  }, []);
};