'use strict';
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
    console.log(elements)

    const neighbors = _.filter(elements, (possibleNeighbor) => {
      return areNeighbors(element, possibleNeighbor)
    })

    console.log(neighbors)
    return neighbors
  },
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