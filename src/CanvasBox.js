const { URL } = require('url')
const { c, render } = require('@jondotsoy/console-draw')
const { styleText } = require('@jondotsoy/style-text')
const profile = require('../index')

class CanvasBox {
  render () {
    const profiles = Array.isArray(profile.publishingPrinciples)
      ? profile.publishingPrinciples.reduce((a, e, i) => {
        const { hostname } = new URL(e)
        if (hostname.endsWith('.com')) a[hostname.replace(/\.com$/, '')] = e
        if (hostname.endsWith('.io')) a[hostname.replace(/\.io$/, '')] = e
        a[i] = e
        a[hostname] = e
        return a
      }, {})
      : {}

    return render(
      c('div', { border: { format: 'blue', theme: 'thick', padding: 1 } }, [
        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c(''),
          c('text', `${styleText(['bold', 'blue'], profile.name)}`)
        ]),
        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c(''),
          c('text', `${profile.description.toString().replace(/@\w+/, (e) => styleText(['green', 'italic'], e))}`)
        ]),

        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c('')
        ]),

        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c(''),
          c('text', `${styleText('green', profile.email)} - ${styleText('green', profile.sameAs)}`)
        ]),

        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c(''),
          c('text', ` - ${styleText('grey', 'Github:')} ${styleText('green', profiles.github || '')}`)
        ]),

        c('columns', { gap: 0, columns: 2, columnsTemplate: [{ width: 2 }, null] }, [
          c(''),
          c('text', ` - ${styleText('grey', 'Twitter:')} ${styleText('green', profiles.twitter || '')}`)
        ])
      ]),
      { width: Math.min(process.stdout.columns, 101) }
    )
  }

  draw () {
    console.log(this.render())
  }
}

module.exports = CanvasBox
