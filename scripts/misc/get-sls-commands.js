const fs = require('fs-extra')
const path = require('path')
const slsPath = require('../docs/config').serverlessRepoPath
const hasCommandsRegex = /this\.commands.*({(.|\n)*?}.*);/g
const allCommands = {}
const pluginsPath = path.join(slsPath, 'lib', 'plugins')
const content = fs.readFileSync(path.join(pluginsPath, 'Plugins.json')).toString()
const lookupFiles = JSON.parse(content).plugins

// lookup all plugin files and find commands
lookupFiles.forEach((file, i) => {
  const plugin = path.resolve(pluginsPath, file)
  const pluginCode = fs.readFileSync(plugin).toString().replace(/`/g, '"')
  const commandsFound = pluginCode.match(hasCommandsRegex)
  if (commandsFound) {
    const finalCommands = parseCodeString(commandsFound)
    const filebase = path.basename(plugin, '.js')
    allCommands[filebase] = finalCommands[0]
  } else {
    console.log(`no match in ${file}`)
  }
})

console.log(allCommands)
// write to file
const contents = JSON.stringify(allCommands, null, 2)
fs.writeFileSync(path.join(__dirname, 'sls-commands.json'), contents, 'utf-8')
console.log('/sls-commands.json file generated')


function parseCodeString(string) {
  const stringObj = string[0].replace(/this\.commands.*=\s/, '').replace(/;/g, '')
  const json = JSON.stringify(eval(`[${stringObj}]`))
  return JSON.parse(json)
}
