// const validMesh = require('./test_data/mesh.json');
// const validMesh10000 = require('./test_data/mesh_x_sin_cos_10000.json');
// const validMesh20000 = require('./test_data/mesh_x_sin_cos_20000.json');

const {mergeElementsWithValues, findNeighborsOfElement} = require('../lib/viewSpotHelpers.js')

const meshSmall = {
  nodes: [
    {id: 1, x: 0, y: 0},
    {id: 2, x: 0, y: 0},
    {id: 3, x: 0, y: 0},
    {id: 4, x: 0, y: 0},
    {id: 5, x: 0, y: 0},
    {id: 6, x: 0, y: 0},
    {id: 7, x: 0, y: 0},
    {id: 8, x: 0, y: 0},
  ],
  elements: [
    {id: 1, nodes: [1, 2, 3]},
    {id: 2, nodes: [1, 2, 4]},
    {id: 3, nodes: [2, 3, 5]},
    {id: 4, nodes: [2, 5, 6]},
    {id: 5, nodes: [2, 4, 7]},
    {id: 6, nodes: [1, 3, 8]},
  ],
  values: [
    {element_id: 1, value: 10},
    {element_id: 2, value: 20},
    {element_id: 3, value: 30},
    {element_id: 4, value: 40},
    {element_id: 5, value: 50},
    {element_id: 6, value: 60},
  ]
}

const {} = require('../lib/viewSpotFinder.js')

describe('View Spot Finder', () => {

  it('merges elements and values', () => {
    expect(mergeElementsWithValues(meshSmall)).toStrictEqual([
      {id: 1, nodes: [1, 2, 3], value: 10},
      {id: 2, nodes: [1, 2, 4], value: 20},
      {id: 3, nodes: [2, 3, 5], value: 30},
      {id: 4, nodes: [2, 5, 6], value: 40},
      {id: 5, nodes: [2, 4, 7], value: 50},
      {id: 6, nodes: [1, 3, 8], value: 60},
    ])
  })

  it('finds all neighbors of an element', () => {
    const {elements} = meshSmall
    const element1 = {id: 1, nodes: [1, 2, 3]}
    const element2 = {id: 2, nodes: [1, 2, 4]}

    expect(findNeighborsOfElement(element1, elements)).toStrictEqual([
      {id: 2, nodes: [1, 2, 4], value: 20},
      {id: 3, nodes: [2, 3, 5], value: 30},
      {id: 6, nodes: [1, 3, 8], value: 60},
    ])

    expect(findNeighborsOfElement(element2, elements)).toStrictEqual([
      {id: 1, nodes: [1, 2, 3], value: 10},
      {id: 5, nodes: [2, 4, 7], value: 50},
    ])
    
  })
  
    
})