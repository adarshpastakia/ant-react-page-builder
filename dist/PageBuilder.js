"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PageBuilder = void 0;

var _react = _interopRequireDefault(require("react"));

var _Card = require("./components/Card");

var _Container = require("./components/Container");

var _Context = require("./components/Context");

var _pageBuilder = require("./page-builder");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var PageBuilder =
/*#__PURE__*/
function (_React$Component) {
  _inherits(PageBuilder, _React$Component);

  function PageBuilder() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, PageBuilder);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(PageBuilder)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      query: ""
    });

    _defineProperty(_assertThisInitialized(_this), "addNewTileToColumn", function () {
      return new Promise(function (resolve) {
        if (_this.props.onAddNew) {
          var result = _this.props.onAddNew();

          if (result instanceof Promise) {
            result.then(function (widget) {
              resolve(widget);
            });
          } else if (result) {
            resolve(result);
          }
        } else {
          resolve();
        }
      });
    });

    return _this;
  }

  _createClass(PageBuilder, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          layout = _this$props.layout,
          editing = _this$props.editing,
          _this$props$widgets = _this$props.widgets,
          widgets = _this$props$widgets === void 0 ? [] : _this$props$widgets,
          onEdit = _this$props.onEdit,
          showTiles = _this$props.showTiles,
          onScroll = _this$props.onScroll,
          _this$props$widgetLis = _this$props.widgetList,
          widgetList = _this$props$widgetLis === void 0 ? [] : _this$props$widgetLis,
          _this$props$minRowHei = _this$props.minRowHeight,
          minRowHeight = _this$props$minRowHei === void 0 ? 120 : _this$props$minRowHei;
      var query = this.state.query;
      var newList = showTiles && widgets && widgetList && widgetList.filter(function (w) {
        return !widgets.find(function (wl) {
          return w.id === wl.id;
        });
      });
      return _react.default.createElement(_Context.RpbContextProvider, this.props, _react.default.createElement("div", {
        className: "react-page-builder",
        "data-editing": editing
      }, _react.default.createElement(_Container.RpbContainer, {
        onAddNew: this.addNewTileToColumn,
        onEdit: onEdit,
        onScroll: onScroll,
        minRowHeight: minRowHeight
      }), editing && _react.default.createElement("div", {
        className: "rpb-aside"
      }, _react.default.createElement("div", {
        className: "rpb-aside__fixed"
      }, _react.default.createElement("div", {
        className: "rpb-aside__internal"
      }, _react.default.createElement(_Card.RpbCard, {
        type: _pageBuilder.PageBuilderTypes.ROW,
        icon: _react.default.createElement("div", {
          className: "rpb-row-icon"
        })
      }), _react.default.createElement(_Card.RpbCard, {
        type: _pageBuilder.PageBuilderTypes.COL,
        icon: _react.default.createElement("div", {
          className: "rpb-col-icon"
        })
      }), _react.default.createElement(_Card.RpbCard, {
        type: _pageBuilder.PageBuilderTypes.HEAD,
        icon: _react.default.createElement("div", {
          className: "rpb-head-icon"
        })
      })), newList && !!newList.length && _react.default.createElement("div", null, _react.default.createElement("input", {
        placeholder: "Filter tiles...",
        className: "rpb-query--input",
        value: this.state.query,
        onChange: function onChange(e) {
          return _this2.setState({
            query: e.target.value
          });
        }
      }))), _react.default.createElement("div", {
        className: "rpb-aside__content"
      }, newList && !!newList.length && _react.default.createElement(_react.default.Fragment, null, newList.filter(function (w) {
        return !query || "".concat(w.title).includes(query);
      }).map(function (widget) {
        return _react.default.createElement(_Card.RpbCard, {
          key: widget.id,
          widget: widget,
          type: _pageBuilder.PageBuilderTypes.TILE
        }, widget.title);
      }))))));
    }
  }]);

  return PageBuilder;
}(_react.default.Component);

exports.PageBuilder = PageBuilder;