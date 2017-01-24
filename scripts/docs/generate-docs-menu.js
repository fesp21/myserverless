const config = require('./config')
const dirTree = require('directory-tree')
const breakWord = 'content'
const path = require('path')
const fs = require('fs-extra')
const matter = require('gray-matter')

function trimContent(content) {
  return content.replace(/^\s+|\s+$/g, '')
}
// Creates menus for files amidst other files in a directory
function generateFileMenus(d) {
  const tempMenus = []

	// Read directories, their files, create menus
  const files = fs.readdirSync(d)
  files.forEach(file => {
    const rootPath = path.join(d, file)

    const stats = fs.statSync(rootPath)
    if (stats.isFile() && rootPath.indexOf('index.md') == -1) {
 		  // Read file
      const content = fs.readFileSync(path.join(d, file)).toString()
 		  //  Remove .md
      file = file.indexOf('.md') > -1 ? file.split('.md')[0] : file
			// parse yaml frontmatter for title
      const yamlInfo = matter(trimContent(content)).data
      let title
      if (yamlInfo.menuText) {
        title = yamlInfo.menuText
      } else {
        title = path.basename(file, '.md').replace(/_/g, ' ')
        console.log(`MISSING TITLE ON ${file}`)
        console.log(`Using this instead: ${title}`)
      }

      tempMenus.push({
        path: `${d.split(breakWord)[1]}/${file}`,
        title,
        order: yamlInfo.menuOrder
      })
			// Sort by menu order
      tempMenus.sort((a, b) => {
        if (a.order > b.order) {
          return 1
        }
        if (a.order < b.order) {
          return -1
        }
        return 0
      })
    }
  })

  return tempMenus
}

// Generates menus from all docs, with some overrides
function createMenus() {
  const menus = {}

  const defaults = [{
    path: '/framework/docs/providers/aws/guide',
    title: 'AWS - Guide',
    order: 1
  }, {
    path: '/framework/docs/providers/aws/cli-reference',
    title: 'AWS - CLI Reference',
    order: 2
  }, {
    path: '/framework/docs/providers/aws/events',
    title: 'AWS - Events',
    order: 3
  }, {
    path: '/framework/docs/providers/aws/examples',
    title: 'AWS - Examples',
    order: 4
  }]

  menus['/framework/docs'] = defaults
  menus['/framework/docs/providers'] = defaults
  menus['/framework/docs/providers/aws'] = defaults

  const dirs = [
    path.join(config.siteDocsPath, 'providers/aws/guide'),
    path.join(config.siteDocsPath, 'providers/aws/cli-reference'),
    path.join(config.siteDocsPath, 'providers/aws/events'),
    path.join(config.siteDocsPath, 'providers/aws/examples'),
  ]
  dirs.forEach(d => {
    const arr = generateFileMenus(d)

    arr.forEach(m => {
      menus[m.path] = arr
    })

    // Don't forget to add menus for the dirs above
    menus[d.split(breakWord)[1]] = arr
  })
  return menus
}

module.exports = function generateDocMenu() {
  let menus = createMenus()

  menus = `module.exports = ${JSON.stringify(menus, null, 2)}`
  const p = path.join(config.docsMenuPath, 'generated-menu.js')
  fs.writeFile(p, menus, 'utf-8', (err) => {
    if (err) {
      return console.log(err)
    }
    console.log(`${config.docsMenuPath}generated-menu.js Docs file generated`)
  })
}
