const fs = require("fs");

const {viewSpotFinder} = require('./lib/viewSpotFinder.js')
const {meshValidator} = require('./lib/meshValidator.js')

const cliArguments = process.argv.slice(2)

if (cliArguments.length < 2) {
  console.error("USAGE: node viewSpot.js <path/to/mesh/file.json> <number of view spots>")
  return
}
const meshFile = cliArguments[0] 
const numberOfViewSpots = cliArguments[1] || 0 

if (fs.existsSync(meshFile)){
  const meshObject = require(meshFile)
  meshValidator(meshObject)
  viewSpotFinder(meshObject, numberOfViewSpots)
} else {
  console.error(`file ${meshFile} does not exist`)
}





