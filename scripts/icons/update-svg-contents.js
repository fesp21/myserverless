const fs = require('fs-extra')
const path = require('path')

module.exports = function renameSVGClasses(filePath, callBack) {
  const files = fs.readdirSync(filePath)
  files.map((file, i) => {
    const p = path.join(filePath, file)
    const name = path.basename(p, '.svg')
    fs.readFile(p, 'utf8', (err, contents) => {
      if (err) {
        console.log(err)
      }

      const matches = contents.match(/class="(.?)"/g)
      if (matches) {
        for (let n = 0; n < matches.length; n++) {
          const className = matches[n].replace('class=', '').replace(/"/g, '')
          const find = `class="${className}"`
          const replace = `class="${name}-${className}"`
          contents = contents.replace(find, replace)
          const findStyle = `.${className}`
          const replaceStyle = `.${name}-${className}`
          contents = contents.replace(findStyle, replaceStyle)
        }
      }

      fs.writeFileSync(p, contents)

      if (files.length === (i + 1)) {
        console.log('SVG contents update DONE')
        callBack && callBack(null, files)
      }
    })
  })
}
