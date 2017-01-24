const fs = require('fs-extra')
const path = require('path')
const parse = require('htmlparser2')
const jade = require('jade')
const spriteTemplate = path.join(__dirname, 'templates', 'layout.jade')
const _ = require('lodash')

module.exports = function buildSprite(filePath, files, cb) {
  const data = {
    svg: {
      xmlns: 'http://www.w3.org/2000/svg',
      'xmlns:xlink': 'http://www.w3.org/1999/xlink',
      style: 'position:absolute; width: 0; height: 0'
    },
    defs: [],
    symbols: []
  }
  // each over files
  files.forEach((file) => {
    const fpath = path.join(filePath, file)
    // load and minify
    const buffer = fs.readFileSync(fpath, 'utf8')
    // get filename for id generation
    const filename = path.basename(fpath, '.svg')
    const handler = new parse.DomHandler((error, dom) => {
      if (error) {
        console.log(error)
      }
      _parseDomObject(data, filename, dom, 'sls-icon-')
    })

    // lets create parser instance
    const Parser = new parse.Parser(handler, {
      xmlMode: true
    })
    Parser.write(buffer)
    Parser.end()
  })
  // console.log('Final', data)
  const spriteContents = _createSprite(data)

  // TODO expose this as option
  const svgs = path.join(__dirname, '..', '..', 'src', 'assets', 'icons')
  const spriteDestinationPath = path.join(svgs, 'sprite.svg')
  const jsDestinationPath = path.join(svgs, 'sprite.js')
  fs.writeFile(spriteDestinationPath, spriteContents, 'utf8', () => {
    console.log('sprite.svg Build DONE')
    const prefix = 'module.exports =  \`'
    const postfix = '\`;\n'
    const combinedCode = prefix + spriteContents + postfix
    fs.writeFile(jsDestinationPath, combinedCode, (err) => {
      if (err) {
        return console.log(err)
      }
      console.log('The sprite.js was generated!')
      cb(null)
    })
  })
}

let _createSprite = function (data) {
  return jade.renderFile(spriteTemplate, data)
}

let _parseDomObject = function (data, filename, dom, prefix) {
  const id = _convertFilenameToId(filename)
  if (dom && dom[0]) {
    _defs(id, dom[0], data.defs)
    _symbols(id, dom[0], data.symbols, prefix)
  }

  return data
}

let _convertFilenameToId = function (filename) {
  let _name = filename
  const dotPos = filename.indexOf('.')
  if (dotPos > -1) {
    _name = filename.substring(0, dotPos)
  }
  return _name
}

let _defs = function (id, dom, data) {
  // lets find defs into dom
  const defs = _.filter(dom.children, { name: 'defs' })
  // check childrens
  defs.forEach((item) => {
    if (item.children && item.children.length > 0) {
      // mutable attribute
      item.children.forEach((_data) => {
        _data.attribs.id = [id, _data.attribs.id || 'icon-id'].join('-')
        data.push(_data)
      })
    }
  })

  return data
}

let _symbols = function (id, dom, data, prefix) {
  // create symbol object
  const symbol = {
    type: 'tag',
    name: 'symbol',
    attribs: {
      viewBox: dom.attribs.viewBox,
      id: prefix + id,
      class: dom.attribs.class,
    },
    next: null,
    prev: null,
    parent: null
  }

  // add dom children without defs and titles
  symbol.children = _.filter(dom.children, (obj) => {
    return obj.name !== 'defs' && obj.name !== 'title'
  })

  // go through the svg element
  _parseSVG(symbol.children, id)

  // push symbol data
  data.push(symbol)

  return data
}

let _parseSVG = function (arr, id) {
  const data = []
  arr.forEach((obj, i) => {
    if (obj) {
      // console.log('obj', obj)
      // add unic ids to urls
      _fixUrls(obj, id)
      // add ids
      _fixIds(obj, id)
      // add classes for customization
      _addPathClasses(obj, id, i)
      // go deeper if children exists
      if (obj.children && obj.children.length > 0) {
        _parseSVG(obj.children, id)
      }
      data.push(obj, id)
    }
  })

  return data
}

let _addPathClasses = function (obj, id, i) {
  var hasClass = (obj.attribs.class) ? `${obj.attribs.class} ` : ''
  if (obj.name === 'path') {
    obj.attribs.class = `${hasClass + id}-path-${i}`
  }
  if (obj.name === 'circle') {
    var hasClass = (obj.attribs.class) ? `${obj.attribs.class} ` : ''
    obj.attribs.class = `${hasClass + id}-circle-${i}`
  }
}

let _fixUrls = function (obj, id) {
  let key
  let match
  const json = obj.attribs
  if (json) {
    for (key in json) {
      if (json.hasOwnProperty(key)) {
        match = /url\(\s*#([^ ]+?)\s*\)/g.exec(json[key])
        if (key && match) {
          json[key] = `url(#${id}-${match[1]})`
        }
      }
    }
  }
}

let _fixIds = function (obj, id) {
  // add id
  if (obj.attribs && obj.attribs.id) {
    obj.attribs.id = [id, obj.attribs.id].join('-')
  }
  // add id to use tag
  if (obj.name === 'use') {
    obj.attribs['xlink:href'] = [`#${id}`, obj.attribs['xlink:href'].replace('#', '')].join('-')
  }
}
