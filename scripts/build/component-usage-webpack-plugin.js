const lookup = require('climb-lookup')
const packageJSONPath = lookup.lookupSync('package.json')
const packageInfo = require(packageJSONPath)

function ComponentUsagePlugin(output, options) {
  this.options = options
}

ComponentUsagePlugin.prototype.apply = function apply(compiler) {
  compiler.plugin('done', (stats) => {
    const data = stats.toJson()
    // data has all files being used in project
    console.log(data)

    // Parse for component files
    // var componentsUsed = getComponentsUsed(data)

    // Send to serverless function
    // sendToAWSLambda(packageInfo, componentsUsed)
  })
}

module.exports = ComponentUsagePlugin
