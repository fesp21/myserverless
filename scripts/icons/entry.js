const async = require('async')
const fs = require('fs-extra')
const path = require('path')
const optimizeSVG = require('./optimize-svg')
const fixSpriteClassNames = require('./update-svg-contents')
const generateSprite = require('./generate-sprite')
const generateList = require('./generate-list')
const svgs = path.join(__dirname, '..', '..', 'src', 'assets', 'icons')
const dest = path.join(__dirname, '..', '..', 'dist', 'icons')

const iconsInProject = fs.readdirSync(svgs).filter((x) => {
  return x.match(/\.svg$/) && !x.match(/sprite/)
})

async.waterfall([
  function (next) {
    // empty tmp svg folder
    fs.emptyDir(dest, (error) => {
      if (error) {
        next(error)
      }
      next(null)
    })
  },
  function (next) {
    // optimize all SVGs
    for (let i = 0; i < iconsInProject.length; i++) {
      const svg = path.join(svgs, iconsInProject[i])
      const cb = (iconsInProject.length === (i + 1)) ? next : null
      optimizeSVG(svg, dest, cb)
    }
  },
  // Update svg content to fix className clashes
  function (next) {
    fixSpriteClassNames(dest, (err, files) => {
      if (err) {
        next(err)
      }
      next(null, files)
    })
  },
  function (files, next) {
    // make sprite file
    generateSprite(dest, files, next)
  },
], (err, result) => {
  if (err) {
    console.log('error', err)
  }

  generateList(iconsInProject, svgs)
  console.log('Finished processing Icons')
})
