'use strict';
const { each } = require('underscore');
const _ = require('underscore');

module.exports = {
  // Combines the elements list and the values list into one
  // i.e. {id: element_id, nodes: [n1, n2, n3]} into {id: element_id, nodes: [n1, n2, n3], value: <value>} 
  mergeElementsWithValues: (meshObject) => {
    const {elements, values} = meshObject

    _.map(elements, (element) => {
      element.value = _.chain(values)
        .find((value) => {return value.element_id === element.id})
        .get('value')
        .value()

      return element
    })

    return elements
  },

  // Returns list of elements neighboring an element
  findNeighborsOfElement: (element, elements) => {
    return _.filter(elements, (possibleNeighbor) => {return areNeighbors(element, possibleNeighbor)})
  },

  // returns true if all neighbors have a lower value than the input element
  isLocalMaxima: (element, neighbors) => {
    return _.every(neighbors, (neighbor) => {
      return element.value >= neighbor.value  
    })
  },

  // returns true if the provided element is NOT a neighbor to any of the elements/viewSpots provided in the second argument
  elementNotNeighborToAlreadyFoundViewSpots: (element, viewSpots) => {
    return _.every(viewSpots, (viewSpot) => {
      return areNotNeighbors(viewSpot, element)
    })
  },

  // formats the founrd view spots (removes 'nodes'-property from the object and renames 'id' into 'element_id')
  formatViewSpots: (viewSpots) => {
    return _.map(viewSpots, (viewSpot) => {
      return {element_id: viewSpot.id, value: viewSpot.value}
    })
  }
}


// elements are neighbors if they share a vertice, or: both elements have EXACTLY two nodes in common 
const areNeighbors = (element1, element2) => {
  const [node1, node2, node3] = element1.nodes
  const nodeSet2 = element2.nodes

  return (
    nodeSet2.includes(node1) && nodeSet2.includes(node2) & !nodeSet2.includes(node3) ||
    nodeSet2.includes(node1) && !nodeSet2.includes(node2) & nodeSet2.includes(node3) ||
    !nodeSet2.includes(node1) && nodeSet2.includes(node2) & nodeSet2.includes(node3)
  ) 
}

const areNotNeighbors = (element1, element2) => {
  return !areNeighbors(element1, element2)
}