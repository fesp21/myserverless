const fs = require('fs-extra')
const path = require('path')
const SVGO = require('svgo')
const SVGOConfig = require('./svgo-config')

module.exports = function optimizeSVG(svgPath, destinationFolder, cb) {
  const name = path.basename(svgPath)
  const SVGOSettings = SVGOConfig(`svg-${name.replace('.svg', '')}`)
  const svgo = new SVGO(SVGOSettings)
  fs.readFile(svgPath, 'utf8', (err, data) => {
    if (err) {
      throw err
    }

    svgo.optimize(data, (result) => {
        // console.log(result);
      const outputPath = path.join(destinationFolder, name)
      fs.writeFile(outputPath, result.data, (err) => {
        if (err) {
          return console.log(err)
        }
        console.log(`${name} copied to lib!`)
        if (cb) {
          cb(null)
        }
      })
    })
  })
}
