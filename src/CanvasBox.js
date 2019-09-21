const { EOL } = require('os')
const boxen = require('boxen')
const chalk = require('chalk')
const url = require('url')
const profile = require('../index')

class CanvasBox {
  draw() {
    const profiles = Array.isArray(profile.publishingPrinciples)
      ? profile.publishingPrinciples.reduce((a, e, i) => {
        const { hostname } = url.parse(e);
        if (hostname.endsWith('.com')) a[hostname.replace(/\.com$/, '')] = e;
        if (hostname.endsWith('.io')) a[hostname.replace(/\.io$/, '')] = e;
        a[i] = e;
        a[hostname] = e;
        return a;
      }, {})
      : {};

    // console.log(profiles);
    console.log(
      boxen(
        [
          chalk`{blue.bold ${profile.name}}`,
          `${profile.description.toString().replace(/@\w+/, (e) => chalk`{green.italic ${e}}`)}`,
          ``,
          chalk`{green ${profile.email}} — {green ${profile.sameAs}}`,
          chalk` — {grey Github:} {green ${profiles.github || ''}}`,
          chalk` — {grey Twitter:} {green ${profiles.twitter || ''}}`
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
