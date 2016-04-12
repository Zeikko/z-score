'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ZScore = function () {
  function ZScore() {
    _classCallCheck(this, ZScore);

    this.data = {};
  }

  _createClass(ZScore, [{
    key: 'train',
    value: function train(data) {
      var _this = this;

      _lodash2.default.forEach(data, function (dataItem) {
        _lodash2.default.forEach(dataItem, function (dataValue, dataKey) {
          if (_lodash2.default.isNumber(dataValue)) {
            if (_lodash2.default.isUndefined(_this.data[dataKey])) {
              _this.data[dataKey] = {
                values: []
              };
            }
            _this.data[dataKey].values.push(dataValue);
          }
        });
      });

      this.data = _lodash2.default.mapValues(this.data, function (dataSet) {
        dataSet.mean = _lodash2.default.mean(dataSet.values);
        dataSet.stdDev = stdDev(dataSet.values, dataSet.mean);
        return dataSet;
      });
    }
  }, {
    key: 'calculate',
    value: function calculate(dataItem) {
      var _this2 = this;

      return _lodash2.default.mapValues(dataItem, function (dataValue, dataKey) {
        var difference = dataValue - _this2.data[dataKey].mean;
        return difference / _this2.data[dataKey].stdDev;
      });
    }
  }]);

  return ZScore;
}();

exports.default = ZScore;


function stdDev(values, mean) {
  return Math.sqrt(variance(values, mean));
}

function variance(values, mean) {
  values = _lodash2.default.map(values, function (value) {
    return Math.pow(value - mean, 2);
  });
  return _lodash2.default.sum(values) / values.length;
}