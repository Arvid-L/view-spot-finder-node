'use strict';

const {viewSpotFinder} = require('./lib/viewSpotFinder.js')
const {meshValidator} = require('./lib/meshValidator.js')

module.exports.viewSpotFinder = async (event) => {
  try { 
    meshValidator(event) 
  }
  catch(e) {
    console.error(e)
  }

  const viewSpots = viewSpotFinder(event)

  return {
    statusCode: 200,
    body: JSON.stringify(viewSpots),
  };
};
