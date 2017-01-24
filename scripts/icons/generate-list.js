/**
 * Script to generate the sprite of icons included in project
 */
const fs = require('fs')
const path = require('path')

module.exports = function makeIconList(icons, destinationFolder) {
  const list = {}
  for (let i = 0; i < icons.length; i++) {
    const icon = icons[i]
    const name = icon.replace('.svg', '')
    console.log('name', name)
    list[name] = {
      filename: icon,
      // cdnLink: ""
    }
  }

  const iconExports = `module.exports = ${JSON.stringify(list, null, 2)}`

  fs.writeFile(`${destinationFolder}/icon-list.js`, iconExports, (err) => {
    if (err) {
      return console.log(err)
    }
  })
}
