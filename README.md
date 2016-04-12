# Z-Score

Calculates the z-score (also known as standard score, z-value and normal score) for numeric object attributes.

## Installation

```npm install z-score```

## Usage

```javascript
var ZScore = require('z-score').default
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
```