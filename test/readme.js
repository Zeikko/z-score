import { expect } from 'chai'
var ZScore = require('../lib/zscore').default

describe('Readme example', () => {
  it('should calculate the correct z score', () => {
    var zScore = new ZScore()
    zScore.train([{
      temperature: 30,
      pressure: 1130
    }, {
      temperature: 20,
      pressure: 1126
    }])
    var result = zScore.calculate({
      temperature: 15,
      pressure: 1122
    })
    expect(result).to.deep.equal({ 
      pressure: -3,
      temperature: -2 
    })
  })
})
  



