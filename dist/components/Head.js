"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RpbHead = void 0;

var _react = _interopRequireDefault(require("react"));

var _Actions = require("./Actions");

var _Context = require("./Context");

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

var RpbHead =
/*#__PURE__*/
function (_React$Component) {
  _inherits(RpbHead, _React$Component);

  function RpbHead() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RpbHead);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RpbHead)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      text: ""
    });

    _defineProperty(_assertThisInitialized(_this), "refEl", _react.default.createRef());

    return _this;
  }

  _createClass(RpbHead, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        text: this.props.config ? this.props.config.text || "" : ""
      });
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      this.setState({
        text: newProps.config ? newProps.config.text || "" : ""
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props$config = this.props.config,
          config = _this$props$config === void 0 ? {
        id: "",
        text: ""
      } : _this$props$config;
      return _react.default.createElement(_Context.RpbContextConsumer, null, function (_ref) {
        var removeObject = _ref.removeObject,
            editing = _ref.editing,
            onHeadEdited = _ref.onHeadEdited;

        var onKeyPress = function onKeyPress(e) {
          var input = e.target;

          if (e.keyCode === 13) {
            onHeadEdited(config.id, _this2.state.text);
            input.blur();
          }
        };

        return _react.default.createElement("div", {
          className: "rpb-head"
        }, _react.default.createElement(_Actions.RpbActions, {
          onDelete: function onDelete() {
            return removeObject(config.id);
          }
        }), _react.default.createElement("div", {
          className: "rpb-head_container",
          ref: _this2.refEl,
          "data-id": config.id
        }, editing && _react.default.createElement("input", {
          value: _this2.state.text,
          placeholder: "Click to edit heading",
          onFocus: function onFocus(e) {
            return e.target.select();
          },
          onChange: function onChange(e) {
            return _this2.setState({
              text: e.target.value
            });
          },
          onKeyUp: onKeyPress
        }), !editing && _react.default.createElement("span", null, config.text)));
      });
    }
  }]);

  return RpbHead;
}(_react.default.Component);

exports.RpbHead = RpbHead;