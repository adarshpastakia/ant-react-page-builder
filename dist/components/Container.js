"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbContainer = void 0;

var _react = _interopRequireDefault(require("react"));

var _pageBuilder = require("../page-builder");

var _dnd = require("../utils/dnd");

var _Context = require("./Context");

var _Row = require("./Row");

var _Head = require("./Head");

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

var RpbContainer =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbContainer, _React$Component);

  function RpbContainer() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RpbContainer);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RpbContainer)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "refEl", _react.default.createRef());

    _defineProperty(_assertThisInitialized(_this), "addNewTileToColumn", function (evt, appendNewObject) {
      var target = evt.target;

      if (target.classList.contains(_dnd.classes.col) && _this.props.onAddNew) {
        var tile = (0, _dnd.getNearest)(target.firstElementChild, _dnd.classes.tile);

        if (!tile) {
          _this.props.onAddNew().then(function (config) {
            if (config) {
              appendNewObject(target.dataset.id || "", 0, (0, _dnd.getNodeConfig)({
                type: _pageBuilder.PageBuilderTypes.TILE,
                widgetId: config.id
              }, _this.props.minRowHeight), config);
            }
          });
        }
      } else {
        var _tile = (0, _dnd.getNearest)(target, _dnd.classes.tile);

        if (_tile && _this.props.onEdit) {
          _this.props.onEdit(_tile.dataset.id || "");
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "addNewColumnToRow", function (evt, appendNewObject) {
      var target = evt.target;

      if (target.classList.contains(_dnd.classes.row) && _this.props.onAddNew) {
        var newcol = (0, _dnd.getNodeConfig)({
          type: _pageBuilder.PageBuilderTypes.COL
        });
        appendNewObject(target.dataset.id || "", -1, newcol);

        _this.props.onAddNew().then(function (config) {
          if (config) {
            appendNewObject(newcol.id || "", 0, (0, _dnd.getNodeConfig)({
              type: _pageBuilder.PageBuilderTypes.TILE,
              widgetId: config.id
            }, _this.props.minRowHeight), config);
          }
        });
      }
    });

    return _this;
  }

  _createClass(RpbContainer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return _react.default.createElement(_Context.RpbContextConsumer, null, function (_ref) {
        var dragging = _ref.dragging,
            appendNewNode = _ref.appendNewNode,
            layout = _ref.layout,
            moveExistingNode = _ref.moveExistingNode;
        console.log(layout);
        return _react.default.createElement("div", {
          className: "rpb-container",
          ref: _this2.refEl,
          onScroll: _this2.props.onScroll,
          onClick: function onClick(e) {
            return _this2.addNewTileToColumn(e, appendNewNode);
          },
          onDoubleClick: function onDoubleClick(e) {
            return _this2.addNewColumnToRow(e, appendNewNode);
          },
          onDragLeave: function onDragLeave(e) {
            return (0, _dnd.onDragLeave)(e, dragging);
          },
          onDragExit: function onDragExit(e) {
            return (0, _dnd.onDragLeave)(e, dragging);
          },
          onDragOver: function onDragOver(e) {
            return (0, _dnd.onDragOver)(e, dragging);
          },
          onDrop: function onDrop(e) {
            return [(0, _dnd.onDrop)(e, dragging, appendNewNode, moveExistingNode)];
          }
        }, layout.map(function (config, i) {
          return config.type === _pageBuilder.PageBuilderTypes.HEAD ? _react.default.createElement(_Head.RpbHead, {
            key: i,
            config: config
          }) : _react.default.createElement(_Row.RpbRow, {
            key: i,
            config: config
          });
        }));
      });
    }
  }]);

  return RpbContainer;
}(_react.default.Component);

exports.RpbContainer = RpbContainer;