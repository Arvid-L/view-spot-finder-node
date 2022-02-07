'use strict';
const _ = require('underscore');

const {mergeElementsWithValues, findNeighborsOfElement} = require('../lib/viewSpotHelpers.js')

module.exports = {
  viewSpotFinder: (meshObject, numberOfViewSpots) => {
  
    elements = mergeElementsWithValues(meshObject).sort((elem) => {return elem.value})

    return true
  },
  
}