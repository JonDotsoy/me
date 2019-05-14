const { EOL } = require('os')
const boxen = require('boxen')
const chalk = require('chalk')
const profile = require('../index')

class CanvasBox {
  draw () {
    console.log(
      boxen(
        [
          chalk`{blue.bold ${profile.name}}`,
          `${profile.description}`,
          ``,
          chalk`{green ${profile.email}} — {green ${profile.website}}`,
          chalk` — {grey Github:} {green ${profile.profiles.github}}`,
          chalk` — {grey Twitter:} {green ${profile.profiles.twitter}}`
        ].join(EOL),
        {
          padding: 1,
          borderStyle: 'bold',
          borderColor: 'blue',
          align: 'left',
          float: 'left'
        }
      )
    )
  }
}

module.exports = CanvasBox
