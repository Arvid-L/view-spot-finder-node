'use strict';
const { each } = require('underscore');
const _ = require('underscore');

const {mergeElementsWithValues, findNeighborsOfElement, elementNotNeighborToAlreadyFoundViewSpots, isLocalMaxima, formatViewSpots} = require('../lib/viewSpotHelpers.js')

module.exports = {
  viewSpotFinder: (meshObject, numberOfViewSpots = Infinity) => {
    const viewSpots = []
    const elements = mergeElementsWithValues(meshObject)
      .sort((elem1, elem2) => {return elem2.value - elem1.value}) 

    // Using every instead of each allows us to stop the execution when the number of desired viewSpots is found, so we don't have to iterate over the whole array AND we don't have to use a while loop
    _.every(elements, (element) => {
      const neighbors = findNeighborsOfElement(element, elements)

      if (isLocalMaxima(element, neighbors) && elementNotNeighborToAlreadyFoundViewSpots(element, viewSpots)) {
        viewSpots.push(element)
        numberOfViewSpots -= 1
      }

      // Execution stops when this returns a falsy value
      return numberOfViewSpots > 0
    })

    // Format result into [{element_id: ..., value: ...}, {element_id: ..., value: ...}, ...]
    return formatViewSpots(viewSpots)
  },
  
}