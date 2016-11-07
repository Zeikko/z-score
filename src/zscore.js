import _ from 'lodash'

export default class ZScore {

  constructor() {
    this.data = {}
  }

  train(data) {
    _.forEach(data, dataItem => {
      _.forEach(dataItem, (dataValue, dataKey) => {
        if(_.isNumber(dataValue)) {
          if(_.isUndefined(this.data[dataKey])) {
            this.data[dataKey] = {
              values: []
            }
          }
          this.data[dataKey].values.push(dataValue)
        }
      })
    })

    this.data = _.mapValues(this.data, (dataSet) => {
      dataSet.mean =  _.mean(dataSet.values)
      dataSet.stdDev = stdDev(dataSet.values, dataSet.mean)
      return dataSet
    })
  }

  calculate(dataItem) {
    const zScores = _.mapValues(dataItem, (dataValue, dataKey) => {
      if(_.isNumber(dataValue) && this.data[dataKey]) {
        const difference = dataValue - this.data[dataKey].mean
        return difference / this.data[dataKey].stdDev
      }
    })
    return _.pickBy(zScores, zScore => {
      return !_.isUndefined(zScore)
    })
  }

}

function stdDev(values, mean) {
  return Math.sqrt(variance(values, mean))
}

function variance(values, mean) {
  values = _.map(values, (value) => {
    return Math.pow(value - mean, 2)
  })
  return _.sum(values) / values.length
}