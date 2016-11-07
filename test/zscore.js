import ZScore from '../src/zscore'
import { staticTemperature, increasingTemperature, dataSetWithNullItems } from './fixtures/weather'
import { expect } from 'chai'

let zScore

describe('ZScore', () => {

  beforeEach(() => {
    zScore = new ZScore()
  })

  describe('train', () => {
    it('should have correct training data', () => {
      zScore.train(staticTemperature)
      expect(zScore.data).to.deep.equal({
        pressure: {
          values: [
            101325,
            101300,
            101330
          ],
          mean: 101318.33333333333,
          stdDev: 13.123346456686352
        },
        temperature: {
          values: [10, 11, 9],
          mean: 10,
          stdDev: 0.816496580927726
        }
      })
    })

    it('should have correct training data', () => {
      zScore.train(increasingTemperature)
      expect(zScore.data).to.deep.equal({
        pressure: {
          values: [
            101325,
            101330
          ],
          mean: 101327.5,
          stdDev: 2.5
        },
        temperature: {
          values: [-5, 6, 12],
          mean: 4.333333333333333,
          stdDev: 7.0395706939809575
        }
      })
    })
  })

  describe('calculate', () => {

    it('should calculate the correct z score', () => {
      zScore.train(staticTemperature)
      expect(zScore.calculate({
        description: 'cloudy',
        temperature: 11
      })).to.deep.equal({
        temperature: 1.224744871391589
      })
    })

    it('should calculate the correct z score', () => {
      zScore.train(staticTemperature)
      expect(zScore.calculate({
        temperature: 12
      })).to.deep.equal({
        temperature: 2.449489742783178
      })
    })

    it('should calculate the correct z scores', () => {
      zScore.train(staticTemperature)
      expect(zScore.calculate({
        temperature: -10,
        pressure: 101280
      })).to.deep.equal({
        pressure: -2.921002921004012,
        temperature: -24.49489742783178
      })
    })

    it('should calculate the correct z scores with null values in dataset', () => {
      zScore.train(dataSetWithNullItems)
      expect(zScore.calculate({
        temperature: -10,
        pressure: 101280
      })).to.deep.equal({
        temperature: -11
      })
    })

  })

})