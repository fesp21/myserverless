/**
 * This script adds header links to the docs in the serverless github repo
 */
const fs = require('fs-extra')
const path = require('path')
const dir = require('node-dir')

const localdocsPath = path.join(__dirname, '..', '..', '/serverless/docs/')
console.log('localdocsPath', localdocsPath)
// const pathToSLSRepo = path.join()

const link = (location) => {
  return `
<!-- DOCS-SITE-LINK:START automatically generated  -->
### [Read this on the main serverless docs site](https://www.serverless.com/framework${location})
<!-- DOCS-SITE-LINK:END -->`
}

let callBack

dir.readFiles(localdocsPath, {
  match: /.md$/,
  //exclude: /^\./
}, (err, content, filename, next) => {
  if (err) throw err
  const removeLinkRegex = /<!--.*DOCS-SITE-LINK:START((.|\n)*?END.*-->)/g
  const removeExisting = content.replace(removeLinkRegex, '')
  const blankLineRegex = /^\s*\n/gm
  const replaceBlankLines = removeExisting.replace(blankLineRegex, '\n')
  const sitePath = filename.split('/serverless/docs/')[1].replace('.md', '').replace('README', '')
  const siteDocLink = link(`/docs/${sitePath}`)
  const addLink = replaceBlankLines.replace(/(<!--.*(.|\n)*?.*-->)/, `${'$1' + '\n'}${siteDocLink}`)
  console.log(`/docs/${sitePath} updated with link`)
  // console.log('replace', addLink)
  fs.writeFileSync(filename, addLink)

  next()
},
  (err, files) => {
    if (err) {
      callBack && callBack(err)
    }
    callBack && callBack(null, files)
  }
)
